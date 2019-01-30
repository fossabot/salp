#!/usr/bin/env node
// Serve vue app inside electron
const electron = require('electron')
const path = require('path')
const proc = require('child_process')

// example: ./scripts/serve -- --mode production -- --inspect=5858
//    frontend args:    --mode production
//    app args:         --inspect=5858
const args = process.argv.slice(2)
let sepIndex = args.indexOf('--')
let frontendArgs = args.slice(sepIndex + 1)
sepIndex = frontendArgs.indexOf('--')
let appArgs = frontendArgs.splice(sepIndex)
appArgs.shift()

let apps = []

const frontend = proc.fork(require.resolve('@salp/frontend/scripts/serve.js'), frontendArgs, {
    cwd: path.resolve(__dirname, '../node_modules', '@salp/frontend'),
    env: {
        ...process.env,
        IS_ELECTRON: true
    },
    stdio: 'inherit',
    windowsHide: false
})

handleProcClose(frontend)
apps.push(frontend)

frontend.on('message', m => {
    if (m.type === 'error') {
        throw new Error('[> master]\tFrontend could not be compiled. Reason:' + m.content.message)
    }

    console.log('\n[> master]\tFrontend running. Starting electron...\n')

    const url = m.content

    const application = proc.spawn(electron, ['' + path.resolve(__dirname, '..')].concat(appArgs), {
        stdio: 'inherit',
        windowsHide: false,
        env: {
            ...process.env,
            WEBPACK_DEV_SERVER_URL: url
        }
    })

    handleProcClose(application)
    apps.push(application)
})

function handleProcClose(p) {
    p.on('close', code => {
        process.exit(code)
    })
}

function handleTerminationSignal (signal) {
    process.on(signal, function signalHandler() {
        apps.filter(child => !child.killed)
            .forEach(child => {
                child.kill(signal)
            })
    })
}

handleTerminationSignal('SIGINT')
handleTerminationSignal('SIGTERM')
