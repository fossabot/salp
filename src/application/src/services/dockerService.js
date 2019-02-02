const { app, ipcMain } = require('electron')
const DockerManager = require('./docker/dockerManager.js')

let dockerManagers = {}

function up({ sender }, course) {
    const dockerManager = getDockerManager(course)
    dockerManager.up(sender)
}

function down({ sender }, course) {
    const dockerManager = getDockerManager(course)
    dockerManager.down(sender)
}

function removeContainersAndNetwork({ sender }, course) {
    const dockerManager = getDockerManager(course)
    dockerManager.removeContainersAndNetwork(sender)
}

function remove({ sender }, course) {
    const dockerManager = getDockerManager(course)
    dockerManager.removeAll(sender)
}

function checkState({ sender }, course) {
    const dockerManager = getDockerManager(course)
    dockerManager.checkState(sender)
}

function getAllContainers({ sender }) {
    const course = {
        name: 'allCourses'
    }
    const dockerManager = getDockerManager(course)
    dockerManager.getAllContainers(sender)
}

function getDockerManager(course) {
    let dockerManager = dockerManagers[course.name]
    if (dockerManager === undefined) {
        dockerManager = new DockerManager(course)
        dockerManagers[course.name] = dockerManager
    }

    return dockerManager
}

app.on('ready', () => {
    ipcMain.on('docker:up', up)
    ipcMain.on('docker:down', down)
    ipcMain.on('docker:removeContainer', removeContainersAndNetwork)
    ipcMain.on('docker:removeAll', remove)
    ipcMain.on('docker:checkState', checkState)
    ipcMain.on('docker:getAllContainers', getAllContainers)
})
