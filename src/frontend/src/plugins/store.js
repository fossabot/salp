import Vuex from 'vuex'
import StoreData from '@/store'

let store

export { store }
export default {
    install(Vue) {
        Vue.use(Vuex)

        store = new Vuex.Store({
            strict: true,
            ...StoreData
        })
    }
}
