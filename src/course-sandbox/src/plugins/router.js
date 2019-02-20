import Router from 'vue-router'

let router
const routes = [
    {
        path: '/',
        name: 'entry'
    }
]

export { router }
export default {
    install(Vue) {
        Vue.use(Router)

        router = new Router({
            routes
        })
    }
}
