// Set translated page title as component option
import { i18n } from '@/plugins/i18n'

export default {
    beforeMount() {
        const pageTitleTranslationKey = this.$options.pageTitleTranslationKey
        if (!pageTitleTranslationKey) {
            return
        }

        const translatedKey = i18n.t(pageTitleTranslationKey)
        this.$emit('pageTitle', translatedKey)
    }
}
