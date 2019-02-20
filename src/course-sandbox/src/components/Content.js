import loadContent from '../load-content'
import Course from './Course.vue'

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
            this.$router.push({ name: routes[0].name })
        },
        render(createElement) {
            return createElement(Course, {
                props: {
                    name: course.name,
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
            render: h => h('Loading course content...')
        },
        error: {
            render: h => h('Loading course content failed!')
        }
    }
}
