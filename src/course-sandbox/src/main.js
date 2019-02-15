import Vue from 'vue'
import App from './App.vue'
import './theme/default.scss'

Vue.config.productionTip = false
Vue.config.ignoredElements = [
    'webview'
]

new Vue({
    render: h => h(App)
}).$mount('#app')
