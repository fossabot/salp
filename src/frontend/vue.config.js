const path = require('path')
const LodashModuleReplacementPlugin = require.resolve('lodash-webpack-plugin')

const isTesting = process.env.NODE_ENV === 'test'
const isCoverage = process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.includes('coverage')
const isUnitTesting = process.env.npm_lifecycle_event && process.env.npm_lifecycle_event === 'test:unit'

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
    codemirror: {
        test: /\/node_modules\/codemirror\//,
        name: 'codemirror'
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
            entry: 'src/index.js',
            template: 'src/index.html',
            chunks: Object.keys(chunks).map(key => chunks[key].name || key).concat('index')
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('$root', path.resolve(__dirname))

        config.plugins
            .delete('preload-index')
            .delete('prefetch-index')

        config.plugin('lodash')
            .use(LodashModuleReplacementPlugin)

        config.module.rule('eslint')
            .exclude
            .add(/dist/)
            .end()

        config.module.rule('js')
            .exclude
            .add(/dist/)
            .end()

        // Inject scss variables in each vue SFC styles
        // @see https://cli.vuejs.org/guide/css.html#automatic-imports
        ;['vue', 'vue-modules'].forEach(type => {
            config.module.rule('scss').oneOf(type)
                .use('style-resource')
                .loader('style-resources-loader')
                .options({
                    patterns: [
                        path.resolve(__dirname, 'src/theme/element/common/var.scss')
                    ]
                })
                .end()
        })

        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options['transformAssetUrls'] = {
                    'SimpleImage': 'src',
                    'AdvancedImage': 'src',
                    'SimpleVideo': 'src',
                    'AppPreview': 'src'
                }

                return options
            })

        // Inject mocked electron api when building browser version
        if (!process.env.IS_ELECTRON) {
            config.resolve.alias
                .set('electron', path.resolve(__dirname, '__mocks__/browser/electron'))
        } else {
            config.externals({
                electron: 'require("electron")'
            })
        }

        if (!isTesting) {
            // Create chunks for (larger) libraries
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: chunks
            })
            config.output.chunkFilename('js/[name].chunk.js')
        }

        if (process.env.IS_REMOTE_DEBUG) {
            config.devtool('source-map')
        }

        // Code coverage
        if (isCoverage) {
            config.module.rule('js')
                .use('istanbul')
                .loader('istanbul-instrumenter-loader')
                .options({ esModules: true })

            config.output
                .devtoolModuleFilenameTemplate('[absolute-resource-path]')
                .devtoolFallbackModuleFilenameTemplate('[absolute-resource-path]?[hash]')

            config.devtool('devtool')
        }

        // @see https://github.com/vuejs/vue-cli/issues/3370
        if (isTesting && !isUnitTesting) {
            config.target(undefined)

            config.module
                .rule('vue')
                .use('vue-loader')
                .tap(options => {
                    options.optimizeSSR = true

                    return options
                })
        }
    },
    pluginOptions: {
        lintStyleOnBuild: false
    }
}
