/* Initialize Design System: Element */
import '../theme/default.scss'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

import Vue from 'vue'
import icons from './icons.js'
import { truncateFilter } from '../filter/truncate.js'

locale.use(lang)

Vue.use(icons)
Vue.use(truncateFilter)
