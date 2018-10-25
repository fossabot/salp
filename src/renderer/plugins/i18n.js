import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('$src/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}

  locales.keys().forEach(key => {
    const matched = key.match(/([a-z]{2})\/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 2) {
      const locale = matched[1]
      const target = matched[2]

      messages[locale] = {}
      messages[locale][target] = locales(key)
    }
  })
  
  return messages
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages: loadLocaleMessages()
})
