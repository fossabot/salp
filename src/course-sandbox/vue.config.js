const path = require('path')

const isCoverage = process.env.npm_lifecycle_event && process.env.npm_lifecycle_event.includes('coverage')

module.exports = {
    filenameHashing: false,
    chainWebpack: config => {
        config.externals({
            'content.js': 'course'
        })

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

        // Inject mocked electron api when building browser version
        if (!process.env.IS_ELECTRON) {
            config.resolve.alias
                .set('electron', path.resolve(__dirname, '__mocks__/browser/electron'))
        } else {
            config.externals({
                ...config.get('externals'),
                electron: 'require("electron")'
            })
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
    }
}
