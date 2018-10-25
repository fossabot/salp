const path = require('path')

module.exports = {
    pages: {
        index: './src/renderer/index.js'
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'src/renderer/'))
            .set('$src', path.resolve(__dirname, 'src/'))
    },
    pluginOptions: {
        electronBuilder: {
            mainProcessFile: './src/main/index.js',
            mainProcessWatch: [
                './src/main'
            ],
        },
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    }
}
