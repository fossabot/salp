const EventEmitter = require('events')

class Course extends EventEmitter {
    constructor(name, chapters) {
        super()

        this.name = name
        this.chapters = chapters
    }
}

module.exports = Course
