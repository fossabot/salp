// provide matomo API the same way as in frontend
import { matomo } from 'salp'

export default {
    install(Vue) {
        Vue.prototype.$matomo = matomo
    }
}
