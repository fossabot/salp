// About window/page helpers
const { BrowserWindow, shell } = require('electron')
const path = require('path')
const { log } = require('./log')
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

    function handleNavigate(event, url) {
        event.preventDefault()

        log.warn('Blocked navigation in about page. URL: ' + url)
    }
    window.webContents.on('will-navigate', handleNavigate)
    window.webContents.on('new-window', handleNavigate)

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
    // TODO: check if production path works on windows and linux too
    let filePath = isProduction
        ? path.resolve(process.resourcesPath, '..', 'ThirdPartyNotices.txt')
        : require.resolve('../../build/generated/ThirdPartyNotices.txt')

    shell.openItem(filePath)
}

module.exports = {
    openAboutWindow,
    openThirdPartyNotices
}
