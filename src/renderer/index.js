import Vue from 'vue'
import App from './components/App.vue'
import router from './plugins/router'
import store from './plugins/store'
import i18n from './plugins/i18n'
import './plugins/design'
import './plugins/icons'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
