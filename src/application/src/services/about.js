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
        fullscreenable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    window.once('closed', () => {
        window = null;
    })

    window.once('ready-to-show', () => {
        window.show();
    })

    window.setMenu(null)

    if (!isProduction) {
        // Load the url of the dev server if in development mode
        window.loadURL(process.env.FRONTEND_URL_FRONTEND + 'about.html')
    } else {
        //   Load the index.html when not in development
        window.loadURL('frontend://./about.html')
    }

    return window
}

function openThirdPartyNotices() {
    let filePath = isProduction
        ? path.resolve(app.getAppPath(), 'ThirdPartyNotices.txt')
        : require.resolve('../../build/generated/ThirdPartyNotices.txt')

    shell.openItem(filePath)
}

module.exports = {
    openAboutWindow,
    openThirdPartyNotices
}
