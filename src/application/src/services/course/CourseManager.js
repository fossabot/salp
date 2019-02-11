const path = require('path')
const Course = require('./Course')

const coreCourses = [
    'salp-course-example'
].map(require.resolve).map(path.dirname)

class CourseManager {
    constructor() {
        this.loadedCourses = []
    }

    discoverCourses() {
        // TODO: implement courses discovery
        return coreCourses
    }

    loadCourses() {
        // TODO: implement patching existing courses combined with caching
        const courses = this.discoverCourses()
        // dumb caching
        if (this.courses.length === courses.length) {
            return this.courses
        } else {
            this.loadedCourses = []
        }

        const errors = courses.reduce((errors, course) => {
            try {
                this._loadCourse(course)
            } catch (e) {
                errors.push(e)
            }

            return errors
        }, [])

        if (errors.length > 0) {
            const err = new Error('Failed to load all courses:\n' + errors.map(e => e.message).join('\n'))
            err.errors = errors

            throw err
        }

        return this.courses
    }

    _loadCourse(path) {
        const course = new Course(path)

        if (!course.isValid) {
            throw new Error('Course "' + path + '" is not valid!')
        }

        this.loadedCourses.push(course)
    }

    get courses() {
        return this.loadedCourses
    }
}

module.exports = CourseManager
