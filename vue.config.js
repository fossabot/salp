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
