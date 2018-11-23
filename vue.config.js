const path = require('path')
const LodashModuleReplacementPlugin = require.resolve('lodash-webpack-plugin');

const chunks = {
    vue: {
        test: /\/node_modules\/\@?vue\//,
        enforce: true,
        name: 'vue'
    },
    elementui: {
        test: /\/node_modules\/element-ui\//,
        name: 'elementui'
    },
    fontawesome: {
        test: /\/node_modules\/\@fortawesome\//,
        enforce: true,
        name: 'fontawesome'
    },
    lodash: {
        test: /\/node_modules\/lodash\//,
        name: 'lodash'
    },
    vendor: {
        test: /\/node_modules\//,
        priority: -10,
        name: 'vendor'
    }
}

module.exports = {
    pages: {
        index: {
            entry: 'src/renderer/index.js',
            template: 'src/renderer/index.html',
            chunks: Object.keys(chunks).map(key => chunks[key].name || key).concat('index')
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

        // Create chunks for (larger) libraries
        config.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: chunks
        })
        config.output.chunkFilename('js/[name].chunk.js')
        
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
