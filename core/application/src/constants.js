const isDev = require('electron-is-dev')

module.exports = {
    persistedSettingsDir: 'appconf',
    isProduction: !isDev
}
