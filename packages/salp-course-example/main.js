import { Course } from 'salp'

class ExampleCourse extends Course {
    ready() {
        console.log(`Course ${this.id} ready!`)
    }

    beforeDestroy() {
        console.log(`Course ${this.id} is being destroyed!`)
    }
}

export default ExampleCourse
