class ContainerService {
    constructor(docker, course) {
        this.docker = docker
        this.course = course
        this.containers = []
    }

    async create(config, networkName, name) {
        await this._loadContainers()
        const containerName = this._getContainerName(name, this.course.name)
        if (this.containers.length !== 0) {
            if (!this._containerExists(`/${containerName}`)) {
                await this._createContainer(config, networkName, name)
            }
        } else {
            await this._createContainer(config, networkName, name)
        }
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

    async stop(sender) {
        await this._loadContainers()
        for (const container of this.containers) {
            let inspect = await container.inspect()
            if (inspect.State.Status !== 'exited') {
                sender.send('docker:status', this._getContainerNameFromInspect(inspect), 'stoping')
                await container.stop()
            }
        }
    }

    async removeAll(sender) {
        await this._loadContainers()
        for (const container of this.containers) {
            let inspect = await container.inspect()
            sender.send('docker:status', this._getContainerNameFromInspect(inspect), 'removing')
            await container.remove()
            sender.send('docker:status', this._getContainerNameFromInspect(inspect), 'removed')
        }
        this.containers = []
    }

    async getStatues(sender) {
        await this._loadContainers()
        if( this.containers.length === 0 ) {
            return {}
        }
        for (const containerName in this.containers) {
            let container = this.containers[containerName]
            let inspect = await container.inspect()
            let name = this._getContainerNameFromInspect(inspect)
            sender.send('docker:status', name, inspect.State.Status)
        }
    }

    async getPorts(sender) {
        await this._loadContainers()
        if( this.containers.length === 0 ) {
            return {}
        }
        for (const container of this.containers) {
            let inspect = await container.inspect()
            let name = this._getContainerNameFromInspect(inspect)
            const ports = inspect.NetworkSettings.Ports
            for(const port in ports) {
                const hostPorts = []
                const hostConfig = ports[port]
                if(hostConfig !== null && Array.isArray(hostConfig)){
                    for (const config of hostConfig){
                        hostPorts.push(config.HostPort)
                    }
                    sender.send('docker:port', name, port, hostPorts)
                }
            }
        }
    }

    async getAllContainers(sender) {
        let allContainers = await this._listContainers()
        for (const container of allContainers) {
            let inspect = await container.inspect()
            let name = this._getContainerNameFromInspect(inspect)
            if(name.indexOf('salp_') !== -1) {
                sender.send('docker:status', name, inspect.State.Status)
            }
        }
    }

    async exec(sender, alias, cmd) {
        const containerName = this._getContainerName(alias, this.course.name)
        const container = this._getContainerByName(containerName)
        await this._runExec(sender, container, cmd)
    }

    async _runExec(sender, container, cmd) {
        const newStream = require('stream')
        let logStream = new newStream.PassThrough()
        let streamData = ''

        logStream.on('data', (chunk) => {
            streamData += chunk.toString()
        });



        let options = {
            Cmd: ['bash', '-c', cmd],
            AttachStdout: true,
            AttachStderr: true
        };

        await container.exec(options, function(err, exec) {
            if (err) return;
            exec.start(function(err, stream) {
                if (err) return;

                container.modem.demuxStream(stream, logStream, process.stderr);

                stream.on('end', () => {
                    sender.send('docker:execResult', streamData)
                })
            });
        });

    }

    async _createContainer(config, networkName, name) {
        let container = await this.docker.createContainer(this._validateConfig(config, networkName, name))
        this.containers.push(container)
    }

    _validateConfig(config, networkName, name) {
        config.Tty = true
        config.OpenStdin  = true

        if (typeof config !== 'object') {
            throw new Error('Config is not an object!')
        }

        if (config.Image === undefined || typeof config.Image !== 'string') {
            throw new Error('Image property(String) is not defined!')
        }

        if (this.course.name === undefined || typeof this.course.name !== 'string') {
            throw new Error('Name is not defined!')
        }

        if (config.Ports !== undefined) {
            let valid = true
            if (!Array.isArray(config.Ports)) {
                valid = false
            }

            config.Ports.forEach(port => {
                if (typeof port !== 'string') {
                    valid = false
                }
            })

            if (!valid) {
                throw new Error('Ports property(array of strings) is not valid!')
            }

            this._processPorts(config)
        }
        this._processNetwork(config, networkName, name)
        config.name = this._getContainerName(name, this.course.name)

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
        for (const name in this.course.containers) {
            const containerName = this._getContainerName(name, this.course.name)
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
        config.Ports.forEach(entry => {
            let protocol = 'tcp'
            if (entry.indexOf('/udp') !== -1) {
                protocol = 'udp'
            }

            let dockerPort = entry.split('/')[0]
            portBindings[`${dockerPort}/${protocol}`] = [{ 'HostPort': '0' }]
        })
        config.HostConfig.PortBindings = portBindings
    }

    _processNetwork(config, networkName, alias) {
        config.NetworkingConfig = {}
        config.NetworkingConfig.EndpointsConfig = {
            [networkName]: {
                Aliases: [alias]
            }
        }
    }

    _getContainerName(suffix, courseName) {
        let name = courseName.trim()
        name = name.replace(/\s/g, '').toLowerCase()

        return `salp_${name}_${suffix}`
    }

    _getContainerNameFromInspect(inspect) {
        const name = inspect.Name.split('/')[1]

        return name ? name : ''
    }

    _getContainerByName(containerName) {
        for (const container of this.containers) {
            if(!container._containerInfo) {
                return
            }
            for(const name of container._containerInfo.Names) {
                if(name === '/' + containerName) {
                    return container
                }
            }
        }
    }
}

module.exports = ContainerService
