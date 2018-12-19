import VueI18n from 'vue-i18n'
import { set } from 'lodash/object'

let localesContext
function updateRequireContext() {
    localesContext = require.context('$root/locales', true, /[a-zA-Z0-9]+\.json$/i)
}
updateRequireContext()

function createMessages(localeFiles, loader) {
    const messages = {}

    localeFiles.forEach(file => {
        const matched = file.match(/([a-z]{2})\/([a-zA-Z0-9]+\/)*([a-zA-Z0-9]+)\.json$/i)
        if (matched && matched.length > 2) {
            // locale (country-code) folder
            let path = [ matched[1] ]

            if (matched[2]) {
                // nested subdirectories
                const subdirs = matched[2].split('/')
                subdirs.pop()

                path = path.concat(subdirs)
            }

            // filename (without suffix)
            path.push(matched[3])

            set(messages, path, loader(file))
        }
    })

    return messages
}

function loadLocaleMessages() {
    return createMessages(localesContext.keys(), localesContext)
}

let i18n

const plugin = {
    install(Vue) {
        Vue.use(VueI18n)

        i18n = new VueI18n({
            locale: process.env.VUE_APP_I18N_LOCALE || 'en',
            fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
            messages: loadLocaleMessages()
        })
    }
}

export default plugin
export { i18n }

if (module.hot) {
    module.hot.accept(localesContext.id, function() {
        updateRequireContext()

        const updatedMessages = loadLocaleMessages()
        Object.keys(updatedMessages).forEach(lang => {
            i18n.setLocaleMessage(lang, updatedMessages[lang])
        })
    })
}
