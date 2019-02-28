const log = require('electron-log')
const { isProduction } = require('../constants')

function setup() {
    // Configure logging
    if (!isProduction) {
        log.transports.file.level = false
        log.transports.console.level = 'debug'
    } else {
        log.transports.file.level = 'error'
        log.transports.console.level = false
    }
}

module.exports = {
    setup,
    default: log
}
