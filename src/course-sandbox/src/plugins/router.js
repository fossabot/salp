import Router from 'vue-router'

let router
const routes = []
const routerOpts = {
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
}

export { router }
export default {
    install(Vue) {
        Vue.use(Router)

        router = new Router(routerOpts)
    }
}
