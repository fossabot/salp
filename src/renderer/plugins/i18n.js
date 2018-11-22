import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { set } from 'lodash/object'

Vue.use(VueI18n)

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

function loadLocaleMessages () {
  const locales = require.context('$src/locales', true, /[a-zA-Z0-9]+\.json$/i)
  
  return createMessages(locales.keys(), locales)
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages: loadLocaleMessages()
})
