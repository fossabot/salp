// Set translated page title as component option
import { i18n } from '@/plugins/i18n'

const mixin = {
    beforeCreate() {
        const pageTitleTranslationKey = this.$options.pageTitleTranslationKey
        if (!pageTitleTranslationKey) {
            return
        }

        const translatedKey = i18n.t(pageTitleTranslationKey)
        this.$emit('pageTitle', translatedKey)
    }
}

const plugin = {
    install(Vue) {
        Vue.mixin(mixin)
    }
}

export default plugin
