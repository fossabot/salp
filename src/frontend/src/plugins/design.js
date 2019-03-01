/* Initialize Design System: Element */
import '../theme/default.scss'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

import icons from './icons.js'
import truncate from '../filters/truncate.js'
import PageTitle from '../mixins/PageTitle'

export default {
    install(Vue) {
        locale.use(lang)

        Vue.use(icons)
        Vue.use(truncate)
        Vue.use(PageTitle)
    }
}