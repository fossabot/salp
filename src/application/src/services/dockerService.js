const { app, ipcMain } = require('electron')
const DockerManager = require('./docker/dockerManager.js')

let dockerManagers = {}

function up({ sender }, course) {
    const dockerManager = getDockerManager(course)
    dockerManager.up()
}

function down({ sender }, course) {
    const dockerManager = getDockerManager(course)
    dockerManager.down()
}

function removeContainersAndNetwork({ sender }, course) {
    const dockerManager = getDockerManager(course)
    dockerManager.removeContainersAndNetwork()
}

function remove({ sender }, course) {
    const dockerManager = getDockerManager(course)
    dockerManager.removeAll()
}

function reset({ sender }, course) {
    const dockerManager = getDockerManager(course)
    dockerManager.reset()
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
    ipcMain.on('docker:reset', reset)
})
