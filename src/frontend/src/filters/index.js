// installs local filters globally as a plugin
import truncateFilter from './truncate'

function install(Vue) {
    Vue.filter('truncate', truncateFilter)
}

export default install
