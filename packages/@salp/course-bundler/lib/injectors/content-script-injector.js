module.exports = ctx => ({
    name: 'content-script',
    apply() {
        const script = ctx.options.contentScript

        return script ? `require('${script}');` : '/* no content script provided */'
    }
})
