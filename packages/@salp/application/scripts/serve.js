#!/usr/bin/env node
// Serve vue app inside electron
const electron = require('electron')
const path = require('path')
const proc = require('child_process')
const { pt } = require('prepend-transform')

let apps = []

const frontend = proc.spawn('npm', ['run serve'], {
    cwd: path.dirname(require.resolve('@salp/frontend')),
    env: process.env,
    stdio: 'pipe',
    shell: true,
    windowsHide: false
})

handleProcClose(frontend)
handleLogging(frontend, 'Vue')
apps.push(frontend)

let application
handleFrontendStart(addr => {
    application = proc.spawn(electron, ['' + path.resolve(__dirname, '..')], {
        stdio: 'pipe',
        windowsHide: false,
        env: {
            ...process.env,
            WEBPACK_DEV_SERVER_URL: addr
        }
    })

    handleProcClose(application)
    handleLogging(application, 'electron')
    apps.push(application)
})

function handleFrontendStart(cb) {
    function checkDevServer(data) {
        const match = data.toString().match(/App running at:$\s+-\sLocal:\s+(http:\/\/.+\/)/m)
        if (match) {
            return match[1]
        }

        return false
    }

    function handleMessages(data) {
        const result = checkDevServer(data)
        if (result) {
            frontend.stdout.off('data', handleMessages)

            cb(result)
        }
    }

    frontend.stdout.on('data', handleMessages)
}

function handleLogging(p, name) {
    p.stdout.pipe(pt(`[> ${name}]\t`, { color: true })).pipe(process.stdout)
    p.stderr.pipe(pt(`[> ${name}]\t`, { color: true })).pipe(process.stderr)
}

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
