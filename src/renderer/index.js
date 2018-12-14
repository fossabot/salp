import Vue from 'vue'
import App from './components/App.vue'
import RouterPlugin, { router } from './plugins/router'
import StorePlugin, { store } from './plugins/store'
import i18nPlugin, { i18n } from './plugins/i18n'
import './plugins/design'

Vue.config.productionTip = false
Vue.config.ignoredElements = [
    'webview'
]

Vue.use(RouterPlugin)
Vue.use(StorePlugin)
Vue.use(i18nPlugin)

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
