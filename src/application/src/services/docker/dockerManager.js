const os = require('os')
const splitca = require('split-ca')
const path = require('path')
const fs = require('fs')
const Docker = require('dockerode')
const { getSettings } = require('../persistedSettings')
const ImageService = require('./imageService')
const ContainerService = require('./containerService')
const NetworkService = require('./networkService')

class DockerManager {
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
            await this.containerService.create(sender, this.course.containers[name], networkName, name)
        }
        await this.containerService.start(sender)
        await this.checkState(sender)
    }

    async down(sender) {
        await this.containerService.stop(sender)
        await this.checkState(sender)
    }

    async removeAll(sender) {
        await this.down(sender)
        await this.containerService.removeAll(sender)
        await this.imageService.removeAll(sender)
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
        await this.containerService.getStatues(sender)
        await this.getPorts(sender)
    }

    async getPorts(sender) {
        await this.containerService.getPorts(sender)
    }

    async getAllContainers(sender) {
        await this.containerService.getAllContainers(sender)
    }

    async ping(sender) {
        await this.docker.ping()
    }

    async exec(sender, alias, cmd) {
        await this.containerService.exec(sender, alias, cmd)
    }

    _initialize() {
        let options = {}
        this._setOptions(options)

        return new Docker(options)
    }

    _setOptions(options) {
        this._setSocketPath(options)
        this._loadCert(options)
        this._setTLS(options)
    }

    _loadCert(options) {
        let certDir = getSettings('certDir')
        try {
            if (certDir !== undefined && certDir.trim() !== '') {
                certDir = certDir.trim()
                options['ca'] = splitca(path.join(certDir, 'ca.pem'));
                options['cert'] = fs.readFileSync(path.join(certDir, 'cert.pem'));
                options['key'] = fs.readFileSync(path.join(certDir, 'key.pem'));
            }
        } catch (error) {
            throw new Error('Cert not found. Reason: ' + error.message)
        }
    }

    _setTLS(options) {
        const checkServerIdentity = getSettings('verifyTls')
        options['checkServerIdentity'] = checkServerIdentity
    }

    _setSocketPath(options) {
        let socket = getSettings('socket')
        if (socket !== undefined && socket.trim() !== '') {
            socket = socket.trim()
            if(socket.indexOf('unix://') === 0) {
                socket = socket.substring(7)
            }
            options['socketPath'] = socket
        } else {
            this._getDefaultSocket(options)
        }
    }

    _getDefaultSocket(options) {
        const isWin = os.type() === 'Windows_NT'
        options['socketPath'] = isWin ? '//./pipe/docker_engine' : '/var/run/docker.sock'
    }
}

module.exports = DockerManager
