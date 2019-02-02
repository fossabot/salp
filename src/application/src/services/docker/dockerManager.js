const os = require('os')
const Docker = require('dockerode')
const ImageService = require('./imageService')
const ContainerService = require('./containerService')
const NetworkService = require('./networkService')
module.exports = class DockerManager {
    constructor(course) {
        this.course = course
        this.docker = this._initialize()
        this.imageService = new ImageService(this.docker, this.course)
        this.containerService = new ContainerService(this.docker, this.course)
        this.networkService = new NetworkService(this.docker, this.course.name)
    }

    async up(sender) {
        this.networkService.create()
        for (const name in this.course.containers) {
            const courseName = this.course.name.trim().replace(/\s/g, '').toLowerCase()
            const containerName = `salp_${courseName}_${name}`
            sender.send('docker:status', containerName, 'pulling')
            await this.imageService.pull(this.course.containers[name].Image)
            sender.send('docker:status', containerName, 'starting')
            const networkName = await this.networkService.getNetworkName()
            await this.containerService.create(this.course.containers[name], networkName, name)
        }
        await this.containerService.start()
        await this.checkState(sender)
    }

    async down(sender) {
        await this.containerService.stop(sender)
        await this.checkState(sender)
    }

    async removeAll(sender) {
        await this.down(sender)
        await this.containerService.removeAll(sender)
        await this.imageService.removeAll()
        await this.networkService.remove()
        await this.checkState(sender)
    }

    async removeContainersAndNetwork(sender) {
        await this.down(sender)
        await this.containerService.removeAll(sender)
        await this.networkService.remove()
        await this.checkState(sender)
    }

    async checkState(sender) {
        let statues = await this.containerService.checkStatues()
        for (const containerName in statues) {
            let status = statues[containerName]
            sender.send('docker:status', containerName, status)
        }
        await this.getPorts(sender)
    }

    async getPorts(sender) {
        let containers = await this.containerService.getPorts()
        for(const containerName in containers) {
            const ports = containers[containerName]
            for(const port in ports) {
                const hostPorts = ports[port]
                sender.send('docker:port', containerName, port, hostPorts)
            }
        }
    }

    async getAllContainers(sender) {
        let allContainers = await this.containerService.getAllContainers()
        for (const containerName in allContainers) {
            let status = allContainers[containerName]
            sender.send('docker:status', containerName, status)
        }
    }

    _initialize() {
        const path = os.type() === 'Windows_NT' ? '//./pipe/docker_engine' : '/var/run/docker.sock'

        return new Docker({ socketPath: path })
    }
}
