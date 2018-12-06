import { truncate } from 'lodash'

const truncateFunction = function(text, length) {
    return truncate(text, {
        length,
        'separator': ' '
    })
}

const truncateFilter = {
    install(Vue) {
        Vue.filter('truncate', truncateFunction)
    }
}

export {
    truncateFilter,
    truncateFunction
}
