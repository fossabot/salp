const persistedSettings = require('./persistedSettings.js')
const CourseService = require('./course')

module.exports = {
    persistedSettings,
    course: new CourseService()
}
