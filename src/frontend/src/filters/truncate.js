import { truncate } from 'lodash'

function truncateText(text, length) {
    return truncate(text, {
        length,
        'separator': ' '
    })
}

const plugin = {
    install(Vue) {
        Vue.filter('truncate', truncateText)
    }
}

export default plugin
export { truncateText }
