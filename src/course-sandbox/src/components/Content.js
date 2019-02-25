import loadContent from '../load-content'
import Course from './Course.vue'
import { Alert } from 'element-ui'

async function loadCourse() {
    const course = await loadContent()

    return {
        name: 'Content',
        beforeCreate() {
            // add chapter routes to router
            const routes = course.routes

            // TODO: fix duplicate route registration when hot-reloading
            this.$router.addRoutes(routes)

            // TODO: load last opened page
            this.$router.replace({ name: routes[0].name })
        },
        render(createElement) {
            return createElement(Course, {
                props: {
                    id: course.id,
                    chapters: course.chapters
                }
            })
        }
    }
}

export default function ContentFactory() {
    return {
        component: loadCourse(),
        loading: {
            render: h => h(Alert, {
                props: {
                    type: 'info',
                    closable: false,
                    title: 'Loading course content...'
                }
            })
        },
        error: {
            render: h => h(Alert, {
                props: {
                    type: 'error',
                    closable: false,
                    title: 'Loading course content failed!'
                }
            })
        }
    }
}
