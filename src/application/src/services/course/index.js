// This service is responsible for loading an (external) course and render its content
const path = require('path')
const { URL } = require('url')
const { app, ipcMain, protocol } = require('electron')
const CourseManager = require('./CourseManager')

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
            protocol.registerFileProtocol('course', async (request, callback) => {
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

        if (url.protocol !== 'course:') {
            // ERR: INVALID_HANDLE Invalid protocol!
            return -5
        }

        // normalize path, strip off first /
        // TODO: decode spaces
        let requestedPath = url.pathname.slice(1)

        // resolve course bundled files
        if (requestedPath.startsWith('course-files')) {
            requestedPath = requestedPath.slice(12 + 1) // "course-files" "/"

            // resolve course
            const requestedCourse = url.host
            const course = this.manager.findCourseById(requestedCourse)

            return path.resolve(course.dir, requestedPath)
        }

        // resolve internal files
        return path.resolve(embeddedCoursePath, requestedPath)
    }
}

module.exports = CourseService
