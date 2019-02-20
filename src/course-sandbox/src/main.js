import Vue from 'vue'
import App from './App.vue'
import './theme/default.scss'
import RouterPlugin, { router } from './plugins/router'

Vue.config.productionTip = false
Vue.config.ignoredElements = [
    'webview'
]

Vue.use(RouterPlugin)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
