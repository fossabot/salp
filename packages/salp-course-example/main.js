import { Course } from 'salp'

class ExampleCourse extends Course {
    ready() {
        console.log(`Course ${this.name} ready!`)
    }

    beforeDestroy() {
        console.log(`Course ${this.name} is being destroyed!`)
    }
}

export default ExampleCourse
