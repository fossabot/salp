// loads the content from the course
import { Course } from 'salp'

function getCourseName() {
    return window.location.hostname
}

async function load() {
    const _content = await import(
        /* webpackChunkName: 'course-content' */
        /* webpackMode: 'lazy' */
        /* webpackPrefetch: true */
        'content.js'
    )

    // work with ES6 imports
    const { chapters, user } = _content
    const UserCourse = user || Course

    // exported Course class from user-script
    const course = new UserCourse(getCourseName(), chapters)

    return course
}

export default load
