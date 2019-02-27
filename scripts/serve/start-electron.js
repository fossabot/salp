// starts electron
const proc = require('./proc')

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

    return proc.spawn(electron, electronArgs, path, {
        ...urlEnvParams
    })
}

module.exports = start
