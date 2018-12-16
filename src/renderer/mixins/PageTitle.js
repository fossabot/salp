// Set translated page title as component option

const mixin = {
    beforeCreate() {
        const pageTitleTranslationKey = this.$options.pageTitleTranslationKey
        if (!pageTitleTranslationKey) {
            return
        }

        const translatedKey = this.$t(pageTitleTranslationKey)
        this.$emit('pageTitle', translatedKey)
    }
}

const plugin = {
    install(Vue) {
        Vue.mixin(mixin)
    }
}

export default plugin
