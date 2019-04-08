// about window/page
import Vue from 'vue'
import About from './components/About.vue'
import './theme/about.scss'

Vue.config.productionTip = false

new Vue({
    render: h => h(About)
}).$mount('#app')
