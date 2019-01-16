const markdown = require('@vuepress/markdown')

const contentElements = require('./contentElements')
const blockEmbedPlugin = require('markdown-it-block-embed')

module.exports = markdown({
    beforeInstantiate(config) {
        // Remove
        config.options
            .highlight(null)
            .end()

        config.plugins
            .delete('highlight-lines')
            .delete('component')

        config.plugin('block-embed')
            .use(blockEmbedPlugin)
            .end()

        config.plugin('contentelements-plugin')
            .use(contentElements)
            .end()
    }
})
