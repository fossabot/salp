// installs local mixins globally as a plugin
import PageTitleMixin from './PageTitle'

function install(Vue) {
    Vue.mixin(PageTitleMixin)
}

export default install
