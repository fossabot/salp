const markdown = require('@vuepress/markdown')

const contentElements = require('./contentElements')

module.exports = markdown({
    beforeInstantiate(config) {
        // Remove
        config.options
            .highlight(null)
            .end()

        config.plugins
            .delete('highlight-lines')
            .delete('component')

        config.plugin('contentelements-plugin')
            .use(contentElements)
            .end()
    }
})
