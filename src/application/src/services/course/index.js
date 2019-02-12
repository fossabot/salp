// This service is responsible for loading an (external) course and render its content
const { ipcMain } = require('electron')
const CourseManager = require('./CourseManager')

class CourseService {
    constructor() {
        this.manager = new CourseManager()

        this._registerHandlers()
    }

    _registerHandlers() {
        ipcMain.on('courses:load', this.handleCoursesLoad.bind(this))
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
}

module.exports = CourseService
