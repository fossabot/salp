const ContainerService = require('./containerService')

describe('containerService.js', () => {
    let sandbox = require('sinon').createSandbox()
    const course = {
        name: 'lorem Ipsum',
        containers: {
            db: {
                Image: 'mysql',
                Env: ["MYSQL_ROOT_PASSWORD=example","MYSQL_DATABASE=test"],
                Cmd: ["--default-authentication-plugin=mysql_native_password"],
                Ports: ["3306"]
            }
        }
    }
    let docker
    let containerService
    let courseName
    let expectedNetworkName

    let aliases = []
    for(let alias in course.containers) {
        aliases.push(alias)
    }
    const createContainer = sandbox.fake.resolves(
        {Id: '123'}
    )
    const listContainers = sandbox.fake.resolves(
        [
            {
                Names: [`/salp_${course.name.toLocaleLowerCase().trim().replace(/\s/g, '')}_${aliases[0]}`]
            }
        ])

    const start = sandbox.stub()
    const stop = sandbox.stub()
    const send = sandbox.spy()
    const getContainer = sandbox.fake.resolves(
        {
            Id: "123",
            start,
            stop
        }
    )

    afterEach(() => {
        sandbox.reset()
    })

    after(() => {
        sandbox.restore()
    })

    describe('private methods', () => {

        beforeEach('create new containerService', () => {
            docker = {
                createContainer,
                listContainers,
                getContainer
            }
            courseName = course.name.toLocaleLowerCase().trim().replace(/\s/g, '')
            containerService = new ContainerService(docker, course)
            expectedNetworkName = `salp_${courseName}_network`
        })

        it('should get correct container name', () => {
            for(const alias in course.containers) {
                const expectedContainerName = `salp_${courseName}_${alias}`
                expect(containerService._getContainerName(alias, course.name)).to.equal(expectedContainerName)
            }
        })

        it('should attach network configuration to given config object', () => {

            for(const alias in course.containers) {
                let config = {}
                const expectedNetworkingConfig = {
                    EndpointsConfig: {
                        [expectedNetworkName]: {
                            Aliases: [alias]
                        }
                    }
                }
                containerService._processNetwork(config, expectedNetworkName, alias)
                expect(config).to.have.deep.property('NetworkingConfig', expectedNetworkingConfig)
            }
        })

        it('should attach ports configuration to given config object', () => {
            let config =  {}
            const expectedPorts = [
                '80',
                '8080/udp',
                '3306/tcp'
            ]
            config.Ports = expectedPorts
            const expectedHostConfigProperty = {
                PortBindings: {
                    '80/tcp': [{ 'HostPort': '0' }],
                    '8080/udp': [{ 'HostPort': '0' }],
                    '3306/tcp': [{ 'HostPort': '0' }]
                }
            }
            containerService._processPorts(config)
            expect(config).to.have.deep.property('HostConfig', expectedHostConfigProperty)

        })

        it('should call docker for listing containers', async () => {
            const containers = await containerService._listContainers()
            expect(listContainers).to.have.been.calledOnce
            expect(getContainer).to.have.been.calledOnce
            expect(containers).to.be.an('array').that.is.not.empty
        })

        it('should discover existing containers', async () => {
            await containerService._discoverContainers()
            expect(containerService.containers).to.be.an('array').that.is.not.empty
        })

        it('should find existing container in containers', async () => {
            await containerService._discoverContainers()
            const containerName = `/salp_${courseName}_${aliases[0]}`
            expect(containerService._containerExists(containerName)).to.be.true
            expect(containerService._containerExists('lorem')).to.be.false
        })

        it('should try to load containers if containers are empty', async () =>{
            expect(containerService.containers).to.be.an('array').that.is.empty
            await containerService._loadContainers()
            expect(containerService.containers).to.be.an('array').that.is.not.empty
        })

        it('should call _createContainer', async () => {
            sandbox.stub(containerService, "_loadContainers")
            sandbox.stub(containerService, "_getContainerName").callsFake(() => {return 'lorem'})
            const createContainer = sandbox.stub(containerService, "_createContainer")
            await containerService.create({},expectedNetworkName, aliases[0])
            expect(createContainer).to.have.been.calledOnce
        })

        it('should get container name from inspect', () => {
            const inspectName = '/salp_lorem_ipsum'
            const containerName = containerService._getContainerNameFromInspect({Name: inspectName})
            const expectedName = inspectName.split('/')[1]
            expect(containerName).to.equal(expectedName)
        })

        describe('validate and process a config object', () => {
            let portsStub
            let networkStub
            let containerStub
            let config

            beforeEach('create new containerService and call _validateConfig',() => {
                containerService = new ContainerService(docker, {...course})
                portsStub = sandbox.stub(containerService, "_processPorts")
                networkStub = sandbox.stub(containerService, "_processNetwork")
                containerStub = sandbox.stub(containerService, "_getContainerName")

                config = course.containers[aliases[0]]
                containerService._validateConfig(config, expectedNetworkName, aliases[0])
            })

            it('should call _processPorts once', () => {
                expect(portsStub).to.have.been.calledOnce
            })

            it('should call _processNetwork once', () => {
                expect(networkStub).to.have.been.calledOnce
            })

            it('should call _getContainerName once', () => {
                expect(containerStub).to.have.been.calledOnce
            })


            it('should throw an error if config is not an object', () => {
                expect(() => containerService._validateConfig("config", expectedNetworkName, aliases[0])).to.throw(Error,'Config is not an object!')
            })

            it('should not throw an error if config is an object', () => {
                expect(() => containerService._validateConfig({}, expectedNetworkName, aliases[0])).to.not.throw(Error,'Config is not an object!')
            })

            it('should throw an error if image property is not present in config', () => {
                expect(() => containerService._validateConfig({}, expectedNetworkName, aliases[0])).to.throw(Error,'Image property(String) is not defined!')
            })

            it('should not throw an errir if image property is not present in config', () => {
                expect(() => containerService._validateConfig({Image: "lorem"}, expectedNetworkName, aliases[0])).to.not.throw(Error,'Image property(String) is not defined!')
            })

            it('should throw an error if course has no name property', () => {
                containerService.course.name = undefined

                expect(() => containerService._validateConfig({Image: "lorem"}, expectedNetworkName, aliases[0])).to.throw(Error,'Name is not defined!')
            })

            it('should not throw an error if course has name property', () => {
                expect(() => containerService._validateConfig({Image: "lorem"}, expectedNetworkName, aliases[0])).to.not.throw(Error,'Name is not defined!')
            })

            it('should throw an error if ports are not valid', () => {
                expect(() => containerService._validateConfig({Image: "lorem", Ports: [8080]}, expectedNetworkName, aliases[0])).to.throw(Error,'Ports property(array of strings) is not valid!')
            })

            it('should not throw error if ports are valid', () => {
                expect(() => containerService._validateConfig({Image: "lorem", Ports: ['8080']}, expectedNetworkName, aliases[0])).to.not.throw(Error,'Ports property(array of strings) is not valid!')
            })

            it('should create a container', async () => {
                sandbox.stub(containerService, "_validateConfig").callsFake(() =>{return {}})
                await containerService._createContainer({}, expectedNetworkName, aliases[0])

                expect(createContainer).to.have.been.calledOnce
                expect(containerService.containers).to.be.an('array').that.is.not.empty
            })
        })
    })

    describe('public methods', () => {
        beforeEach('create new containerService', () => {
            docker = {
                createContainer,
                listContainers,
                getContainer
            }
            courseName = course.name.toLocaleLowerCase().trim().replace(/\s/g, '')
            containerService = new ContainerService(docker, course)
            expectedNetworkName = `salp_${courseName}_network`
        })

        it('should remove all containers', async () => {
            sandbox.stub(containerService, "_loadContainers")
            const getContainerName = sandbox.stub(containerService, "_getContainerNameFromInspect")
            const remove = sandbox.stub()
            const inspectStub = sandbox.stub().callsFake(() => {return 'lorem'})
            containerService.containers = [{remove, inspect: inspectStub}, {remove, inspect: inspectStub}]
            expect(containerService.containers).to.be.an('array').that.is.not.empty
            await containerService.removeAll({send})
            expect(remove).to.have.been.calledTwice
            expect(send).to.have.callCount(4)
            expect(getContainerName).to.have.callCount(4)
            expect(containerService.containers).to.be.an('array').that.is.empty
        })

        it('should stop all containers', async () => {
            sandbox.stub(containerService, "_loadContainers")
            const getContainerName = sandbox.stub(containerService, "_getContainerNameFromInspect")
            const stop = sandbox.stub()
            const inspect = sandbox.fake.resolves({
                State: {
                    Status: 'running'
                }
            })
            const container = {
                inspect,
                stop
            }
            containerService.containers = [container, container]
            await containerService.stop({send})
            expect(stop).to.have.been.calledTwice
            expect(send).to.have.been.calledTwice
            expect(getContainerName).to.have.been.calledTwice
        })

        it('should start all containers', async () => {
            sandbox.stub(containerService, "_loadContainers")
            const start = sandbox.stub()
            const inspect = sandbox.fake.resolves({
                State: {
                    Status: 'exited'
                }
            })
            const container = {
                inspect,
                start
            }
            containerService.containers = [container, container]
            await containerService.start()
            expect(start).to.have.been.calledTwice
        })

        it('should get all salp related containers', async () => {
            const expectedSalpContainerName = 'salp_lorem_ispum'
            const expectedSalpContainerStatus = 'running'
            const inspectStub1 = sandbox.stub().callsFake(() => {return {Name: `/${expectedSalpContainerName}`, State: {Status: expectedSalpContainerStatus}}})
            const inspectStub2 = sandbox.stub().callsFake(() => {return {Name: 'hello_world'}})
            const containers = [{inspect: inspectStub1},{ inspect: inspectStub2}]
            sandbox.stub(containerService, "_listContainers").callsFake(() => {return containers})
            await containerService.getAllContainers({send})

            expect(send).to.have.been.calledOnce
            expect(send).to.have.been.calledWith('docker:status', expectedSalpContainerName, expectedSalpContainerStatus)
        })

        it('should get all exposed and maped host ports', async () => {
            sandbox.stub(containerService, "_loadContainers")
            const containerPort1 = '80/tcp'
            const containerPort2 = '8080/udp'
            const hostPort1 = '32769'
            const hostPort2 = '32770'
            const hostPort3 = '32771'
            const expectedName = 'salp_lorem_ipsum'
            const mockedInspect = {
                Name: `/${expectedName}`,
                NetworkSettings: {
                    Ports: {
                        [containerPort1]: [{HostIp: '0.0.0.0', HostPort: hostPort1}, {HostIp: '0.0.0.0', HostPort: hostPort2}],
                        [containerPort2]: [{HostIp: '0.0.0.0', HostPort: hostPort3}]
                    }
                }
            }
            const inspectStub = sandbox.stub().callsFake(() => {return mockedInspect})
            containerService.containers = [{inspect: inspectStub}]
            await containerService.getPorts({send})
            expect(send).to.have.been.calledWith('docker:port', expectedName, containerPort1, [hostPort1, hostPort2])
            expect(send).to.have.been.calledWith('docker:port', expectedName, containerPort2, [hostPort3])
        })

        it('should get the status of all containers', async () => {
            sandbox.stub(containerService, "_loadContainers")
            const expectedContainerName1 = 'salp_lorem_ipsum'
            const expectedContainerName2 = 'salp_ipsum_ipsum'
            const expectedStatus1 = 'running'
            const expectedStatus2 = 'exited'
            const inspect1 = {
                Name: `/${expectedContainerName1}`,
                State: {
                    Status: expectedStatus1
                }
            }

            const inspect2 = {
                Name: `/${expectedContainerName2}`,
                State: {
                    Status: expectedStatus2
                }
            }

            containerService.containers = [
                {inspect: sandbox.stub().callsFake(() => {return inspect1})},
                {inspect: sandbox.stub().callsFake(() => {return inspect2})}
            ]

            await containerService.getStatues({send})
            expect(send.getCall(0)).to.have.been.calledWith('docker:status', expectedContainerName1, expectedStatus1)
            expect(send.getCall(1)).to.have.been.calledWith('docker:status', expectedContainerName2, expectedStatus2)
        })

    })
})
