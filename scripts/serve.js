#!/usr/bin/env node
// Serve the whole application including (application/electron, frontend and course-sandbox)
const path = require('path')

const serveArgs = require('./serve/parse-args')
const serveFrontend = require('./serve/serve-frontends')
const startElectron = require('./serve/start-electron')

const rootDir = path.resolve(__dirname, '../')

const applicationPath = path.resolve(rootDir, 'src/application')
let frontends = {
    'frontend': path.resolve(rootDir, 'src/frontend'),
    'course_sandbox': path.resolve(rootDir, 'src/course-sandbox')
}
const frontendPorts = {
    'frontend': 8080,
    'course_sandbox': 8090
}

function log(msg) {
    console.log('\n[> serve]\t' + msg + '\n')
}

async function serveAllFrontends() {
    const frontendServePromises = Object.entries(frontends).map(([name, path]) => {
        // inject internal default port
        const frontendArgs = ['--port', frontendPorts[name]].concat(serveArgs[name])

        return serveFrontend(name, path, frontendArgs)
    })

    const frontendServeUrls = await Promise.all(frontendServePromises)

    let frontendUrls = {}
    Object.keys(frontends).forEach((name, index) => {
        frontendUrls[name] = frontendServeUrls[index]
    })

    return frontendUrls
}

async function serve() {
    log('Starting frontends')
    const frontendUrls = await serveAllFrontends()

    console.clear()
    Object.entries(frontendUrls).forEach(([name, url]) => {
        log(name + ' running at ' + url)
    })

    log('Starting electron')
    startElectron(applicationPath, serveArgs.application, frontendUrls)
}

process.on('unhandledRejection', error => {
    if (error.code && error.code === 'MODULE_NOT_FOUND') {
        console.error('\nA module could not be found when serving the application. This might occur when not all dependencies have been installed.')
    }

    throw error
})

// run serve
serve()
