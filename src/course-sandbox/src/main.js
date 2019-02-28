import Vue from 'vue'
import App from './App.vue'
import './theme/default.scss'
import RouterPlugin, { router } from './plugins/router'
import i18nPlugin, { i18n } from './plugins/i18n'
import MatomoPlugin from './plugins/matomo'

Vue.config.productionTip = false
Vue.config.ignoredElements = [
    'webview'
]

Vue.use(RouterPlugin)
Vue.use(i18nPlugin)
Vue.use(MatomoPlugin)

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')
