// Custom plugin to add icons defined in vue components to its state
// for better separation of concerns

import Icon from '@/components/Elements/Icon.vue'

const mixin = {
    beforeCreate() {
        const useIcons = this.$options.icons
        if (!useIcons) {
            return
        }

        this.$icons = useIcons
    }
}

const plugin = {
    install(Vue) {
        // Register global mixin
        Vue.mixin(mixin)

        // Add icon component
        Vue.component(Icon.name, Icon)
    }
}

export default plugin