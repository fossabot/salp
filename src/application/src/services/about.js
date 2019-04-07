// About window/page helpers
const { app, BrowserWindow, shell } = require('electron')
const { promises: fs } = require('fs')
const path = require('path')
const { isProduction } = require('../constants')

let window = null

function openAboutWindow() {
    if (window !== null) {
        window.focus()

        return window
    }

    window = new BrowserWindow({
        width: 400,
        height: 400,
        useContentSize: true,
        titleBarStyle: 'hiddenInset',
        resizable: false,
        minimizable: false,
        maximizable: false,
        alwaysOnTop: true,
        fullscreenable: false
    })

    window.once('closed', () => {
        window = null;
    })

    window.loadFile(path.resolve(__dirname, '../windows/about.html'))

    const navigationInterceptionHandler = (e, url) => {
        e.preventDefault()

        if (url === 'salp://thirdparty-licenses') {
            openThirdPartyNotices()

            return
        }

        shell.openExternal(url)
    }

    window.webContents.on('will-navigate', navigationInterceptionHandler)
    window.webContents.on('new-window', navigationInterceptionHandler)

    window.once('ready-to-show', () => {
        window.show();
    })

    window.setMenu(null)

    return window
}

function openThirdPartyNotices() {
    let filePath = isProduction
        ? path.resolve(app.getAppPath(), 'ThirdPartyNotices.txt')
        : require.resolve('../../build/generated/ThirdPartyNotices.txt')

    shell.openItem(filePath)
}

module.exports = {
    openAboutWindow
}
