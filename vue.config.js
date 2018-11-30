const path = require('path')

module.exports = {
    pages: {
        index: './src/renderer/index.js'
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', path.resolve(__dirname, 'src/renderer/'))
            .set('$src', path.resolve(__dirname, 'src/'))

        config.plugins.delete('preload')
        config.plugins.delete('prefetch')    

        // Code coverage
        if (process.env.NODE_ENV === 'test') {
            config.module.rule('js')
                .use('istanbul')
                    .loader('istanbul-instrumenter-loader')
                    .options({ esModules: true })
                    .before('babel-loader')

            config.output
                .devtoolModuleFilenameTemplate('[absolute-resource-path]')
                .devtoolFallbackModuleFilenameTemplate('[absolute-resource-path]?[hash]')

            config.devtool('inline-cheap-module-source-map')
        }
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
