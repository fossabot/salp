import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Pages/Home.vue'
import Settings from '../components/Pages/Settings.vue'
import Profile from '../components/Pages/Profile.vue'
import Course from '../components/Pages/Course.vue'

Vue.use(Router)

const router = new Router({
    routes: [
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
            component: Course
        }
    ]
})

if (process.env.VUE_APP_ENTRY_ROUTE) {
    router.push(process.env.VUE_APP_ENTRY_ROUTE)
}

export default router
