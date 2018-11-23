const path = require('path')
const LodashModuleReplacementPlugin = require.resolve('lodash-webpack-plugin');

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

        config.plugin('lodash')
            .use(LodashModuleReplacementPlugin)

        // Inject scss variables in each vue SFC styles
        // @see https://cli.vuejs.org/guide/css.html#automatic-imports
        config.module.rule('scss').oneOf('vue')
            .use('style-resource')
                .loader('style-resources-loader')
                .options({
                    patterns: [
                        path.resolve(__dirname, 'src/renderer/theme/element/common/var.scss')
                    ]
                })
                .end()
        
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
        }
    }
}
