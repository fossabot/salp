const persistedSettings = require('./persistedSettings.js')
const CourseService = require('./course')
const docker = require('./docker')

module.exports = {
    persistedSettings: persistedSettings(),
    course: new CourseService(),
    docker: docker()
}
