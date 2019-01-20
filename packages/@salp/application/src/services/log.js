const log = require('electron-log')

const isDevelopment = process.env.NODE_ENV !== 'production'

function setup() {
    // Configure logging
    if (isDevelopment) {
        log.transports.file.level = false
        log.transports.console.level = 'debug'
    } else {
        log.transports.console.level = false
    }
}

module.exports = {
    setup,
    default: log
}
