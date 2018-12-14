import Router from 'vue-router'
import Home from '../components/Pages/Home.vue'
import Settings from '../components/Pages/Settings.vue'
import Profile from '../components/Pages/Profile.vue'
import Course from '../components/Pages/Course.vue'
import CourseDetail from '../components/Layout/Course/CourseDetail.vue'
import CourseContent from '../components/Layout/Course/CourseContent.vue'

let router
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/course',
        name: 'course',
        component: Course,
        children: [
            {
                path: 'detail',
                alias: '',
                name: 'coursedetail',
                component: CourseDetail
            },
            {
                path: 'content',
                name: 'coursecontent',
                component: CourseContent
            }
        ]
    }
]

const plugin = {
    install(Vue) {
        Vue.use(Router)

        router = new Router({
            routes
        })

        if (process.env.VUE_APP_ENTRY_ROUTE) {
            router.push(process.env.VUE_APP_ENTRY_ROUTE)
        }
    }
}

export default plugin
export { router }
