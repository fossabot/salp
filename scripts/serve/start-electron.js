// starts electron
const path = require('path')
const { promises: fs } = require('fs')
const proc = require('./proc')

async function generateLicenses(basePath, resolveContent) {
    const generatedBuildResourcesDir = path.join(basePath, 'build/generated')
    const fileName = path.join(generatedBuildResourcesDir, 'ThirdPartyNotices.txt')

    try {
        await fs.access(fileName)
    } catch {
        const licenses = require(require.resolve('./scripts/build/licenses.js', resolveContent))

        await fs.mkdir(generatedBuildResourcesDir)

        licenses(fileName)
    }
}

async function start(path, args, urls) {
    const resolveContent = {
        paths: [path]
    }

    const electronPath = require.resolve('electron', resolveContent)
    const electron = require(electronPath)

    const electronArgs = [path].concat(args)
    let urlEnvParams = {}
    Object.entries(urls).forEach(([name, url]) => {
        urlEnvParams['FRONTEND_URL_' + name.toUpperCase()] = url
    })

    await generateLicenses(path, resolveContent)

    return proc.spawn(electron, electronArgs, path, {
        ...urlEnvParams
    })
}

module.exports = start
