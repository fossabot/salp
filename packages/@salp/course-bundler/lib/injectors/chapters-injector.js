const globby = require('globby')

module.exports = ctx => ({
    name: 'chapters',
    apply() {
        return genChaptersCode(ctx)
    }
})

async function getChapters(chaptersDir) {
    const paths = await globby([chaptersDir + '/**/*.md'])
    paths.sort()

    return paths
}

async function genChaptersCode(ctx) {
    const paths = await getChapters(ctx.options.chapters)
    let code = `/* chapters generated code */
    exports.default = {`

    code = paths.reduce((acc, cur) => {
        const chapterName = cur.split('/').pop().match(/^\d{2,}-(.+)\.md/)[1]

        return acc + `
        /* chapter: ${cur} */
        '${chapterName}': require('${cur}'),`
    }, code)
    code += `
    };`

    return code
}
