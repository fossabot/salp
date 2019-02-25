import Router from 'vue-router'
import { router as salpRouter } from 'salp'

let router
const routes = []
const routerOpts = {
    mode: 'history',
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

        router.afterEach(to => {
            if (to.meta && to.meta.title) {
                document.title = to.meta.title
            }
        })

        router.afterEach(to => {
            salpRouter.push(to)
        })

        salpRouter.on('route:change', to => {
            router.push(to)
        })
    }
}
