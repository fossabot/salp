module.exports = class ContainerService {
    constructor(docker, course) {
        this.docker = docker
        this.course = course
        this.containers = []
    }

    async create(config, networkName) {
        await this._loadContainers()
        const containerName = this._getContainerName(config, this.course.name)
        if (this.containers.length !== 0) {
            if (!this._containerExists(`/${containerName}`)) {
                await this._createContainer(config, networkName)
            }
        } else {
            await this._createContainer(config, networkName)
        }
    }

    async _createContainer(config, networkName) {
        let container = await this.docker.createContainer(this._validateConfig(config, networkName))
        this.containers.push(container)
    }

    async start() {
        await this._loadContainers()
        for (const container of this.containers) {
            let inspect = await container.inspect()
            if (inspect.State.Status !== 'running') {
                await container.start()
            }
        }
    }

    async stop() {
        await this._loadContainers()
        for (const container of this.containers) {
            let inspect = await container.inspect()
            if (inspect.State.Status !== 'exited') {
                await container.stop()
            }
        }
    }

    async removeAll() {
        await this._loadContainers()
        for (const container of this.containers) {
            await container.remove()
        }
        this.containers = []
    }

    _validateConfig(config, networkName) {
        if (typeof config !== 'object') {
            throw new Error('Config is not an object!')
        }

        if (config.Image === undefined || typeof config.Image !== 'string') {
            throw new Error('Image property(String) is not defined!')
        }

        if (this.course.name === undefined || typeof this.course.name !== 'string') {
            throw new Error('Name is not defined!')
        }

        config.name = this._getContainerName(config, this.course.name)

        if (config.ports !== undefined) {
            let valid = true
            if (!Array.isArray(config.ports)) {
                valid = false
            }

            config.ports.forEach(port => {
                if (typeof port !== 'string') {
                    valid = false
                }
            })

            if (!valid) {
                throw new Error('Ports property(array of strings) is not valid!')
            }

            this._processPorts(config)
            this._processNetwork(config, networkName)
        }

        return config
    }

    async _loadContainers() {
        if (this.containers.length === 0) {
            await this._discoverContainers()
        }
    }

    _containerExists(containerName) {
        let found = this.containers.find(container => {
            if (container._containerInfo === undefined) {
                return false
            }

            return container._containerInfo.Names.includes(containerName)
        })

        return !!found
    }

    async _discoverContainers() {
        const containers = await this._listContainers()
        for (const config of this.course.containers) {
            const containerName = this._getContainerName(config, this.course.name)
            for (const container of containers) {
                for (const name of container._containerInfo.Names) {
                    if (name === `/${containerName}`) {
                        this.containers.push(container)
                    }
                }
            }
        }
    }

    async _listContainers() {
        let containers = []
        for (const container of await this.docker.listContainers({ all: true })) {
            const con = await this.docker.getContainer(container.Id)
            con._containerInfo = container
            containers.push(con)
        }

        return containers
    }

    _processPorts(config) {
        config.HostConfig = {}

        let portBindings = {}
        config.ports.forEach(entry => {
            let protocol = 'tcp'
            if (entry.indexOf('/udp') !== -1) {
                protocol = 'udp'
            }

            let dockerPort = entry.split('/')[0]
            portBindings[`${dockerPort}/${protocol}`] = [{ 'HostPort': '0' }]
        })
        config.HostConfig.PortBindings = portBindings
    }

    _processNetwork(config, networkName) {
        config.NetworkingConfig = {}
        config.NetworkingConfig.EndpointsConfig = { [networkName]: {} }
    }

    _getContainerName(config, courseName) {
        let name = courseName.trim()
        name = name.replace(/\s/g, '').toLowerCase()

        return `salp_${name}_${config.Image}`
    }
}
