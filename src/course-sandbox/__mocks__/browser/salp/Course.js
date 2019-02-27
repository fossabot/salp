class Course {
    constructor(id, chapters, assignments, dockerImages) {
        this.id = id
        this.chapters = chapters
        this.assignments = assignments
        this.dockerImages = dockerImages
    }

    on() {
        // do nothing
    }

    get routes() {
        return []
    }

    get chaptersCount() {
        return 0
    }
}

module.exports = Course
