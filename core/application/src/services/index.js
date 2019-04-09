const CourseService = require('./course')
const docker = require('./docker')

module.exports = {
    course: new CourseService(),
    docker: docker()
}
