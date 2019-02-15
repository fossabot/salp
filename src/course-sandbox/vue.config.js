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
    }
}
