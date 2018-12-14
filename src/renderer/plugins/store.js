import Vuex from 'vuex'
import StoreData from '@/store'

let store

const plugin = {
    install(Vue) {
        Vue.use(Vuex)

        store = new Vuex.Store({
            strict: true,
            ...StoreData
        })
    }
}

export default plugin
export { store }
