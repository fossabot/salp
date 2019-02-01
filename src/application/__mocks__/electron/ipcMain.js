function noop() {}

const ipcMain = {
    on: noop,
}

// add special event property
Object.defineProperty(ipcMain, 'event', {
    value: {
        sender: {
            send: noop
        }
    },
    enumerable: false
})

module.exports = ipcMain
