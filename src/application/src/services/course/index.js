// This service is responsible for loading an (external) course and render its content
const path = require('path')
const fs = require('fs').promises
const http = require('http')
const { URL } = require('url')
const { app, ipcMain, protocol } = require('electron')
const CourseManager = require('./CourseManager')
const { isProduction } = require('../../constants')

const embeddedCoursePath = path.resolve(__dirname, '../../../../course/dist')

class CourseService {
    constructor() {
        this.manager = new CourseManager()

        this._registerHandlers()
        this._registerProtocol()
    }

    _registerHandlers() {
        ipcMain.on('courses:load', this.handleCoursesLoad.bind(this))
    }

    _registerProtocol() {
        app.on('ready', () => {
            // unfortunately registerStreamProtocol does not work
            // @see https://github.com/electron/electron/issues/13519
            // @see https://github.com/electron/electron/issues/13623
            protocol.registerBufferProtocol('course', async (request, callback) => {
                callback(await this.handleCourseRequest(request))
            }, err => {
                if (err) {
                    throw err
                }
            })
        })
    }

    handleCoursesLoad({ sender }) {
        let courses,
            error

        try {
            courses = this.manager.loadCourses()
        } catch (e) {
            courses = this.manager.courses
            error = {
                message: e.message,
                errors: e.errors.map(e => e.message)
            }
        } finally {
            courses = courses.map(c => c.toSimple())

            sender.send('courses:loaded', error, courses)
        }
    }

    async handleCourseRequest(request) {
        const url = new URL(request.url)

        let stream

        // normalize path, strip off first /
        // TODO: decode spaces
        let requestedPath = url.pathname.slice(1)

        if (requestedPath.startsWith('course-files')) {
            // resolve course bundled files
            requestedPath = requestedPath.slice(12 + 1) // "course-files" "/"

            // resolve course
            const requestedCourse = url.host
            const course = this.manager.findCourseById(requestedCourse)
            const subRequest = path.resolve(course.dir, requestedPath)

            stream = await fs.readFile(subRequest)
        } else {
            // resolve internal files
            if (!isProduction && process.env.COURSE_SANDBOX_URL) {
                const subRequest = new URL(process.env.COURSE_SANDBOX_URL)
                subRequest.pathname = requestedPath

                stream = await this._httpGet(subRequest)
            } else {
                const subRequest = path.resolve(embeddedCoursePath, requestedPath)
                stream = await fs.readFile(subRequest)
            }
        }

        return stream
    }

    async _httpGet(url) {
        return new Promise(resolve => {
            http.get(url, res => {
                const data = []

                res.on('data', chunk => {
                    data.push(chunk)
                })

                res.on('end', () => {
                    resolve(Buffer.concat(data))
                })
            }).on('error', e => {
                reject(e)
            })
        })
    }
}

module.exports = CourseService
