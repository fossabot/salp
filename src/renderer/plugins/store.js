import Vuex from 'vuex'

let store

const plugin = {
    install(Vue) {
        Vue.use(Vuex)

        store = new Vuex.Store({
            state: {

            },
            mutations: {

            },
            actions: {

            }
        })
    }
}

export default plugin
export { store }
