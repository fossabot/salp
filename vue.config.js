const path = require('path')

module.exports = {
    pages: {
        index: {
            entry: 'src/renderer/index.js',
            template: 'src/renderer/index.html'
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'src/renderer/'))
            .set('$src', path.resolve(__dirname, 'src/'))

        config.plugins.delete('preload')
        config.plugins.delete('prefetch')    
        
        if (process.env.IS_REMOTE_DEBUG) {
            config.devtool('source-map')
        }
    },
    pluginOptions: {
        electronBuilder: {
            mainProcessFile: 'src/main/index.js',
            mainProcessWatch: [
                'src/main/'
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
