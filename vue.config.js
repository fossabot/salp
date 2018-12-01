const path = require('path')
const LodashModuleReplacementPlugin = require.resolve('lodash-webpack-plugin')

const isTesting = process.env.NODE_ENV === 'test'

const chunks = {
    vue: {
        test: /\/node_modules\/@?vue\//,
        enforce: true,
        name: 'vue'
    },
    elementui: {
        test: /\/node_modules\/element-ui\//,
        name: 'elementui'
    },
    fontawesome: {
        test: /\/node_modules\/\fortawesome\//,
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

        config.plugins
            .delete('preload-index')
            .delete('prefetch-index')

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

        if (!isTesting) {
            // Create chunks for (larger) libraries
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: chunks
            })
            config.output.chunkFilename('js/[name].chunk.js')
        }

        // Inject mocked electron api when building browser version
        if (!process.env.IS_ELECTRON) {
            config.resolve.alias
                .set('electron', path.resolve(__dirname, 'src/renderer/__mocks__/browser/electron'))
        }

        if (process.env.IS_REMOTE_DEBUG) {
            config.devtool('source-map')
        }

        // Code coverage
        if (isTesting) {
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
            mainProcessFile: 'src/main/index.js',
            mainProcessWatch: [
                'src/main/'
            ]
        }
    }
}
