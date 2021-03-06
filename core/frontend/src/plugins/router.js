import Router from 'vue-router'
import Home from '../components/Pages/Home.vue'
import Setup, { stepsPages } from '../components/Pages/Setup.vue'
import Settings from '../components/Pages/Settings.vue'
import Profile from '../components/Pages/Profile.vue'
import Course from '../components/Pages/Course.vue'
import CourseDetail from '../components/Course/CourseDetail.vue'
import CourseView from '../components/Course/CourseView.vue'
import Containers from '../components/Pages/Containers.vue'

let router
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/setup',
        component: Setup,
        children: stepsPages
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    },
    {
        path: '/containers',
        name: 'containers',
        component: Containers
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/course/:courseId',
        name: 'course',
        component: Course,
        props: true,
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
                component: CourseView,
                children: [
                    {
                        path: '*',
                        name: 'coursecontent-default',
                        component: CourseView
                    }
                ]
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
