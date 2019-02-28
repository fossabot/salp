// This service is responsible for loading an (external) course and render its content
const path = require('path')
const fs = require('fs')
const http = require('http')
const { URL } = require('url')
const { app, ipcMain, protocol } = require('electron')
const CourseManager = require('./CourseManager')
const { isProduction } = require('../../constants')

let embeddedCoursePath = path.join(app.getAppPath(), 'course-sandbox')

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

            stream = await this._fileGet(subRequest)
        } else {
            // resolve internal files
            if (requestedPath.startsWith('chapter/')) {
                // serve index, as this is a dynamic route of sandbox SPA
                requestedPath = 'index.html'
            }

            if (!isProduction && process.env.FRONTEND_URL_COURSE_SANDBOX) {
                const subRequest = new URL(process.env.FRONTEND_URL_COURSE_SANDBOX)
                subRequest.pathname = requestedPath

                stream = await this._httpGet(subRequest)
            } else {
                // fix default entry
                if (!requestedPath) {
                    requestedPath = 'index.html'
                }

                const subRequest = path.resolve(embeddedCoursePath, requestedPath)
                stream = await this._fileGet(subRequest)
            }
        }

        return stream
    }

    /**
     * Returns a buffer with file contents and guesses mime-type of file
     * @param path
     * @return {Promise<{ mimeType: string, data: Buffer }>}
     * @private
     */
    async _fileGet(path) {
        const suffix = path.split('.').pop()
        let mimeType
        switch (suffix) {
            case 'html':
                mimeType = 'text/html'
                break
            case 'js':
                mimeType = 'application/javascript'
                break
            case 'css':
                mimeType = 'text/css'
                break
            case 'jpg':
            case 'JPG':
            case 'jpeg':
            case 'JPEG':
                mimeType = 'image/jpeg'
                break
            case 'png':
            case 'PNG':
                mimeType = 'image/png'
                break
            default:
                mimeType = 'text/plain'
                break
        }

        return new Promise((resolve, reject) => {
            // use default fs API instead of fs.promises, as it is not supported by asar
            // @see https://electronjs.org/docs/tutorial/application-packaging#node-api
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err)
                }

                resolve({
                    mimeType,
                    data
                })
            })
        })
    }

    async _httpGet(url) {
        return new Promise(resolve => {
            http.get(url, res => {
                const data = []

                res.on('data', chunk => {
                    data.push(chunk)
                })

                res.on('end', () => {
                    const mimeType = (res.headers['content-type'] || 'text/plain').replace('; charset=UTF-8', '')

                    resolve({
                        mimeType,
                        data: Buffer.concat(data)
                    })
                })
            }).on('error', e => {
                reject(e)
            })
        })
    }
}

module.exports = CourseService
