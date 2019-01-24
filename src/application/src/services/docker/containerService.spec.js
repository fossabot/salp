const { fake, stub } = require('sinon')
const ContainerService = require('./containerService')

describe('containerService.js', () => {
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
    const createContainer = fake.resolves(
        {Id: '123'}
    )
    const listContainers = fake.resolves(
        [
            {
                Names: [`/salp_${course.name.toLocaleLowerCase().trim().replace(/\s/g, '')}_${aliases[0]}`]
            }
        ])

    const start = stub()
    const stop = stub()
    const getContainer = fake.resolves(
        {
            Id: "123",
            start,
            stop
        }
    )

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

        describe('validate and process a config object', () => {
            let portsStub
            let networkStub
            let containerStub
            let config

            beforeEach('create new containerService and call _validateConfig',() => {
                containerService = new ContainerService(docker, {...course})
                portsStub = stub(containerService, "_processPorts")
                networkStub = stub(containerService, "_processNetwork")
                containerStub = stub(containerService, "_getContainerName")

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
                stub(containerService, "_validateConfig").callsFake(() =>{return {}})
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
            stub(containerService, "_loadContainers")
            const remove = stub()
            containerService.containers = [{remove}, {remove}]
            expect(containerService.containers).to.be.an('array').that.is.not.empty
            await containerService.removeAll()
            expect(remove).to.have.been.calledTwice
            expect(containerService.containers).to.be.an('array').that.is.empty
        })

        it('should stop all containers', async () => {
            stub(containerService, "_loadContainers")
            const stop = stub()
            const inspect = fake.resolves({
                State: {
                    Status: 'running'
                }
            })
            const container = {
                inspect,
                stop
            }
            containerService.containers = [container, container]
            await containerService.stop()
            expect(stop).to.have.been.calledTwice
        })

        it('should start all containers', async () => {
            stub(containerService, "_loadContainers")
            const start = stub()
            const inspect = fake.resolves({
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

        it('should call _createContainer', async () => {
            stub(containerService, "_loadContainers")
            stub(containerService, "_getContainerName").callsFake(() => {return 'lorem'})
            const createContainer = stub(containerService, "_createContainer")
            await containerService.create({},expectedNetworkName, aliases[0])
            expect(createContainer).to.have.been.calledOnce
        })
    })
})
