/* Initialize Design System: Element */
import '../theme/default.scss'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

import icons from './icons.js'
import Filters from '../filters'
import Mixins from '../mixins'

export default {
    install(Vue) {
        locale.use(lang)

        Vue.use(icons)
        Vue.use(Filters)
        Vue.use(Mixins)
    }
}
