const os = require('os')
const Docker = require('dockerode')
const ImageService = require('./imageService')
const ContainerService = require('./containerService')
const NetworkService = require('./networkService')
module.exports = class DockerManager {
    constructor(course) {
        this.course = course
        this.docker = this._initialize()
        this.imageService = new ImageService(this.docker)
        this.containerService = new ContainerService(this.docker, this.course)
        this.networkService = new NetworkService(this.docker, this.course.name)
    }

    async up() {
        this.networkService.create()
        for (const name in this.course.containers) {
            await this.imageService.pull(this.course.containers[name].Image)
            await this.containerService.create(this.course.containers[name], await this.networkService.getNetworkName(), name)
        }
        await this.containerService.start()
    }

    async down() {
        await this.containerService.stop()
    }

    async removeAll() {
        await this.down()
        await this.containerService.removeAll()
        await this.imageService.removeAll()
        await this.networkService.remove()
    }

    async removeContainersAndNetwork() {
        await this.down()
        await this.containerService.removeAll()
        await this.networkService.remove()
    }

    _initialize() {
        const path = os.type() === 'Windows_NT' ? '//./pipe/docker_engine' : '/var/run/docker.sock'

        return new Docker({ socketPath: path })
    }
}
