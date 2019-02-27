const globby = require('globby')

module.exports = async options => {
    const chapters = await buildChaptersObj(options)

    const resultObj = {
        chapters,
        docker: options.docker || null,
        assignments: options.assignments || {}
    }

    return { code: JSON.stringify(resultObj, null, 2) }
}

async function getChapters(chaptersDir) {
    const paths = await globby([chaptersDir + '/**/*.md'])
    paths.sort()

    return paths
}

async function buildChaptersObj(options) {
    const chapters = await getChapters(options.chapters)

    return chapters.map(chapterFile => chapterFile.split('/').pop().match(/^\d{2,}-(.+)\.md/)[1])
}
