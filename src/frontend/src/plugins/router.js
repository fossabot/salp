import Router from 'vue-router'
import Home from '../components/Pages/Home.vue'
import Settings from '../components/Pages/Settings.vue'
import Profile from '../components/Pages/Profile.vue'
import Course from '../components/Pages/Course.vue'
import CourseDetail from '../components/Layout/Course/CourseDetail.vue'
import CourseView from '../components/Layout/Course/CourseView.vue'
import CourseCardFull from '../components/Layout/Course/CourseCardFull.vue'
import ContainerOverview from '../components/Layout/Docker/ContainerOverview.vue'

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
        path: '/container',
        name: 'container',
        component: ContainerOverview
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
                component: CourseView
            },
            {
                path: 'full',
                name: 'coursecardfull',
                component: CourseCardFull
            }
        ]
    }
]

export { router }
export default {
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
