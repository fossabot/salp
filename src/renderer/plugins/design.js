/* Initialize Design System: Element */
import '../theme/default.scss';

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

import Vue from 'vue'
import icons from './icons.js'

Vue.use(icons)