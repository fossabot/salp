import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Pages/Home.vue'
import Settings from '../components/Pages/Settings.vue'

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
    }
  ]
})

if (process.env.VUE_APP_ENTRY_ROUTE) {
  router.push(process.env.VUE_APP_ENTRY_ROUTE)
}

export default router