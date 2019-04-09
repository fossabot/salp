const EventEmitter = require('events')

class Course extends EventEmitter {
    constructor(id, chapters, assignments, dockerImages) {
        super()

        this.id = id
        this.chapters = chapters
        this.assignments = assignments
        this.dockerImages = dockerImages
    }

    get routes() {
        return Object.entries(this.chapters)
            .map(([name, component]) => ({
                name,
                component,
                path: '/chapter/' + name,
                meta: {
                    title: name
                }
            }))
    }

    get chaptersCount() {
        return Object.keys(this.chapters).length
    }
}

module.exports = Course
