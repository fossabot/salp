// About window/page helpers
const { app } = require('electron')
const { promises: fs } = require('fs')
const { isProduction } = require('../constants')

async function readThirdPartyNotices() {
    let filePath = isProduction
        ? path.resolve(app.getAppPath(), 'ThirdPartyNotices.txt')
        : require.resolve('../../build/generated/ThirdPartyNotices.txt')

    return fs.readFile(filePath)
}

module.exports = {
    readThirdPartyNotices
}
