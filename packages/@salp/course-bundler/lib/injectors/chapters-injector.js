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
    let code = '/* chapters generated code */\n'
    const imports = []

    // generate imports
    code = paths.reduce((previousCode, chapterFile) => {
        const chapterName = chapterFile.split('/').pop().match(/^\d{2,}-(.+)\.md/)[1]

        imports.push(chapterName)

        return previousCode + `
        import ${chapterName} from '${chapterFile}'`
    }, code)

    // generate export
    const exportsModules = imports.map(m => '\t' + m).join(',\n')
    code += `
    
    export default {
    ${exportsModules}
    }`

    return code
}
