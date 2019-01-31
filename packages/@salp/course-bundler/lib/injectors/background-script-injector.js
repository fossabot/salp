module.exports = ctx => ({
    name: 'background-script',
    apply() {
        const script = ctx.options.backgroundScript

        return script ? `require('${script}');` : '/* no background script provided */'
    }
})
