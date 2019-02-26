// connects routing of frontend and course-sandbox
const EventEmitter = require('events')

// save an internal reference to the original function
const _fns = {}

process.once('loaded', () => {
    // ipcRenderer is only available in renderer process
    const { ipcRenderer } = require('electron')
    _fns.sendToHost = ipcRenderer.sendToHost
})

class Router extends EventEmitter {
    constructor(ipcRenderer) {
        super()

        this._registerHandlers(ipcRenderer)
    }

    push(to) {
        _fns.sendToHost('route:change', to)
    }

    handleHostRouteChange(_, to) {
        this.emit('route:change', to)
    }

    _registerHandlers(ipcRenderer) {
        ipcRenderer.on('route:change', this.handleHostRouteChange.bind(this))
    }
}

module.exports = Router
