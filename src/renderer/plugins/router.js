import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Pages/Home.vue'
import Settings from '../components/Pages/Settings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        title: 'Settings'
      }
    }
  ]
})
