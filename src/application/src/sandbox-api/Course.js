const EventEmitter = require('events')

class Course extends EventEmitter {
    constructor(name, chapters) {
        super()

        this.name = name
        this.chapters = chapters
    }

    get routes() {
        return Object.entries(this.chapters)
            .map(([name, component]) => ({
                name,
                component,
                path: name
            }))
    }

    get chaptersCount() {
        return Object.keys(this.chapters).length
    }
}

module.exports = Course
