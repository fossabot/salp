// loads courses from main process into renderer process
import { ipcRenderer } from 'electron'

class CoursesController {
    constructor() {
        this.courses = []
    }

    async loadCourses() {
        const loaded = new Promise((resolve, reject) => {
            ipcRenderer.once('courses:loaded', (_, error, courses) => {
                if (error) {
                    reject(error)
                }

                resolve(courses)
            })
        })

        ipcRenderer.send('courses:load')

        return loaded
    }
}

let courses

const mixin = {
    beforeCreate() {
        const options = this.$options

        if (options.courses) {
            this.$courses = options.courses
        } else if (options.parent && options.parent.$courses) {
            this.$courses = options.parent.$courses
        }
    }
}

export { courses }
export default {
    install(Vue) {
        Vue.mixin(mixin)

        courses = new CoursesController()
    }
}
