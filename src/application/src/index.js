'use strict'

const path = require('path')
const { app, BrowserWindow, protocol } = require('electron')
const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
const { log, setup: setupLog } = require('./services/log')
require('./services')
require('./menu')
const { isProduction } = require('./constants')
if (!isProduction) {
    // Don't load any native (external) modules until the following line is run:
    require('module').globalPaths.push(process.env.NODE_MODULES_PATH)
}

// handle file loading in production
protocol.registerStandardSchemes(['frontend', 'course'], { secure: true })
function registerFrontendScheme() {
    protocol.registerFileProtocol('frontend', (request, callback) => {
        const requestedPath = request.url.substr(10)
        const resolvedPath = path.join(app.getAppPath(), 'frontend', requestedPath)
        callback({ path: resolvedPath })
    }, error => {
        if (error) {
            log.error('Could not register frontend:// protocol. Reason: ' + error)
        }
    })
}

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
    const window = new BrowserWindow({
        width: 1440,
        height: 960,
        titleBarStyle: 'hidden'
    })

    setupLog()

    if (!isProduction) {
    // Load the url of the dev server if in development mode
        window.loadURL(process.env.FRONTEND_URL_FRONTEND)

        if (!process.env.IS_TEST && !process.env.IS_REMOTE_DEBUG) {
            window.webContents.once('dom-ready', () => {
                window.webContents.openDevTools({ mode: 'detach' })
            })
        }
    } else {
        registerFrontendScheme()
        //   Load the index.html when not in development
        window.loadURL('frontend://./index.html')
    }

    window.on('closed', () => {
        mainWindow = null
    })

    window.webContents.on('devtools-opened', () => {
        window.focus()
        setImmediate(() => {
            window.focus()
        })
    })

    return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
    // on macOS it is common for applications to stay open until the user explicitly quits
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // on macOS it is common to re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createMainWindow()
    }
})

// create main BrowserWindow when electron is ready
app.on('ready', async () => {
    if (isProduction && !process.env.IS_TEST) {
    // Install Vue Devtools
        await installExtension(VUEJS_DEVTOOLS)
    }
    mainWindow = createMainWindow()
})
