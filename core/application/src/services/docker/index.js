const { app, ipcMain } = require('electron')
const DockerManager = require('./dockerManager')

let dockerManagers = {}

function up({ sender }, course) {
    try {
        const dockerManager = getDockerManager(course)
        dockerManager.up(sender)
        sender.send('docker:ready', true)
    } catch (error) {
        sender.send('docker:ready', false, error.message)
    }
}

function down({ sender }, course) {
    try {
        const dockerManager = getDockerManager(course)
        dockerManager.down(sender)
        sender.send('docker:ready', true)
    } catch (error) {
        sender.send('docker:ready', false, error.message)
    }
}

function removeContainersAndNetwork({ sender }, course) {
    try {
        const dockerManager = getDockerManager(course)
        dockerManager.removeContainersAndNetwork(sender)
        sender.send('docker:ready', true)
    } catch (error) {
        sender.send('docker:ready', false, error.message)
    }
}

function remove({ sender }, course) {
    try {
        const dockerManager = getDockerManager(course)
        dockerManager.removeAll(sender)
        sender.send('docker:ready', true)
    } catch (error) {
        sender.send('docker:ready', false, error.message)
    }
}

function checkState({ sender }, course) {
    try {
        const dockerManager = getDockerManager(course)
        dockerManager.checkState(sender)
        sender.send('docker:ready', true)
    } catch (error) {
        sender.send('docker:ready', false, error.message)
    }
}

function getAllContainers({ sender }) {
    const course = {
        name: 'allCourses'
    }
    try {
        const dockerManager = getDockerManager(course)
        dockerManager.getAllContainers(sender)
        sender.send('docker:ready', true)
    } catch (error) {
        sender.send('docker:ready', false, error.message)
    }
}

async function testSettings({ sender }) {
    const course = {
        name: 'testDocker'
    }
    try {
        const dockerManager = new DockerManager(course)
        await dockerManager.ping(sender)
        sender.send('docker:ready', true)
    } catch (error) {
        sender.send('docker:ready', false, error.message)
    }
}

async function exec({ sender }, course, alias, cmd) {
    try {
        const dockerManager = getDockerManager(course)
        await dockerManager.exec(sender, alias, cmd)
        sender.send('docker:ready', true)
    } catch (error) {
        sender.send('docker:ready', false, error.message)
    }
}

function processCourse(course) {
    course.containers =  {}
    Object.entries(course.images).forEach(([alias, config]) => {
        course.containers[alias] = {
            Image: config.image,
            Ports: config.ports || ['']
        }
    })
    delete course.images
}

function getDockerManager(course) {
    processCourse(course)
    let dockerManager = dockerManagers[course.name]
    if (dockerManager === undefined) {
        dockerManager = new DockerManager(course)
        dockerManagers[course.name] = dockerManager
    }

    return dockerManager
}

function init() {
    ipcMain.on('docker:up', up)
    ipcMain.on('docker:down', down)
    ipcMain.on('docker:removeContainer', removeContainersAndNetwork)
    ipcMain.on('docker:removeAll', removeContainersAndNetwork)
    ipcMain.on('docker:checkState', checkState)
    ipcMain.on('docker:getAllContainers', getAllContainers)
    ipcMain.on('docker:test', testSettings)
    ipcMain.on('docker:exec', exec)
}

module.exports = function() {
    app.on('ready', init)
}
