import Vue from 'vue'
import App from './App.vue'
import './theme/default.scss'
import RouterPlugin, { router } from './plugins/router'
import i18nPlugin, { i18n } from './plugins/i18n'

Vue.config.productionTip = false
Vue.config.ignoredElements = [
    'webview'
]

Vue.use(RouterPlugin)
Vue.use(i18nPlugin)

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')
