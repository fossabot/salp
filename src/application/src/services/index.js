const persistedSettings = require('./persistedSettings.js')
const CourseService = require('./course')
const dockerService = require('./dockerService.js')

module.exports = {
    persistedSettings,
    course: new CourseService(),
    dockerService
}
