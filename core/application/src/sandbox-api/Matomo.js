// Matomo tracking API in course-sandbox

// save an internal reference to the original function
const _fns = {}

process.once('loaded', () => {
    // ipcRenderer is only available in renderer process
    const { ipcRenderer } = require('electron')
    _fns.sendToHost = ipcRenderer.sendToHost
})

class Matomo {
    trackEvent(...args) {
        _fns.sendToHost('matomo:trackEvent', ...args)
    }
}

module.exports = Matomo
