const mock = require('mock-require');
let ContainerService = require('./containerService')
let ImageService = require('./imageService')
let NetworkService = require('./networkService')

describe('dockerManager.js', () => {
    const course = {
        name: 'lorem',
        containers: {
            wp: {
                image: 'wordpress'
            }
        }
    }

    let sandbox = require('sinon').createSandbox()
    let dockerManager
    let pull
    let createContainer
    let startContainer
    let stopContainer
    let removeAllContainer
    let getStatues
    let getPorts
    let getAllContainers
    let removeAllImage
    let removeNetwork
    let createNetwork
    let getNetworkName
    let send
    let getSettings

    before(() => {
        createNetwork = sandbox.stub(NetworkService.prototype, 'create')
        removeNetwork = sandbox.stub(NetworkService.prototype, 'remove')
        getNetworkName = sandbox.stub(NetworkService.prototype, 'getNetworkName')

        pull = sandbox.stub(ImageService.prototype, 'pull')
        removeAllImage = sandbox.stub(ImageService.prototype, 'removeAll')

        createContainer = sandbox.stub(ContainerService.prototype, 'create')
        startContainer = sandbox.stub(ContainerService.prototype, 'start')
        stopContainer = sandbox.stub(ContainerService.prototype, 'stop')
        removeAllContainer = sandbox.stub(ContainerService.prototype, 'removeAll')
        getStatues = sandbox.stub(ContainerService.prototype, 'getStatues')
        getPorts = sandbox.stub(ContainerService.prototype, 'getPorts')
        getAllContainers = sandbox.stub(ContainerService.prototype, 'getAllContainers')
    })

    beforeEach('create new dockerManager', () => {
        send = sandbox.spy()
        getSettings = sandbox.stub().callsFake(() => '')
        mock('../persistedSettings', {getSettings})
        const DockerManager = mock.reRequire('./dockerManager')
        dockerManager = new DockerManager({ ...course })
    })

    afterEach(() => {
        mock.stop('../persistedSettings')
        sandbox.reset()
    })

    after(() => {
        sandbox.restore()
    })

    describe('public methods', () => {
        it('should start up the docker container', async () => {
            const checkState = sandbox.stub(dockerManager, 'checkState')
            await dockerManager.up({send})
            expect(createNetwork).to.have.been.calledOnce
            expect(getNetworkName).to.have.been.calledOnce
            expect(pull).to.have.been.calledOnce
            expect(createContainer).to.have.been.calledOnce
            expect(startContainer).to.have.been.calledOnce
            expect(send).to.have.been.calledTwice
            expect(checkState).to.have.been.calledOnce
        })

        it('should stop the docker container', async () => {
            const checkState = sandbox.stub(dockerManager, 'checkState')
            await dockerManager.down()
            expect(stopContainer).to.have.been.calledOnce
            expect(checkState).to.have.been.calledOnce
        })

        it('should remove all container, images and network', async () => {
            const checkState = sandbox.stub(dockerManager, 'checkState')
            const down = sandbox.stub(dockerManager, 'down')
            await dockerManager.removeAll()
            expect(down).to.have.been.calledOnce
            expect(removeAllContainer).to.have.been.calledOnce
            expect(removeAllImage).to.have.been.calledOnce
            expect(removeNetwork).to.have.been.calledOnce
            expect(checkState).to.have.been.calledOnce
        })

        it('should remove container and network, but no images', async () => {
            const checkState = sandbox.stub(dockerManager, 'checkState')
            const down = sandbox.stub(dockerManager, 'down')
            await dockerManager.removeContainersAndNetwork()
            expect(removeAllContainer).to.have.been.calledOnce
            expect(removeNetwork).to.have.been.calledOnce
            expect(removeAllImage).to.not.have.been.calledOnce
            expect(down).to.have.been.calledOnce
            expect(checkState).to.have.been.calledOnce
        })

        it('should check the status of all containers', async () => {
            const getPorts = sandbox.stub(dockerManager, 'getPorts')
            await dockerManager.checkState()
            expect(getStatues).to.have.been.calledOnce
            expect(getPorts).to.have.been.calledOnce
        })

        it('should get all mapped ports', async () => {
            await dockerManager.getPorts()
            expect(getPorts).to.have.been.calledOnce
        })

        it('should get the statues and names of all salp related containers', async () => {
            await dockerManager.getAllContainers()
            expect(getAllContainers).to.have.been.calledOnce
        })

    })

    describe('private methods', () => {
        it('should set options', () => {
            const setSocketPath = sandbox.stub(dockerManager, '_setSocketPath')
            const loadCert = sandbox.stub(dockerManager, '_loadCert')
            const setTLS = sandbox.stub(dockerManager, '_setTLS')

            let options = {}
            dockerManager._setOptions(options)
            expect(setSocketPath).to.have.been.calledOnce
            expect(loadCert).to.have.been.calledOnce
            expect(setTLS).to.have.been.calledOnce
        })

        it('should load and set certificate', () => {
            mock.stop('../persistedSettings')
            const expectedCert = 'cert-data'
            const expectedCa = 'ca-data'
            getSettings = sandbox.stub().callsFake(() => 'path/to/cert')
            const readFileSync = sandbox.stub().callsFake(() => expectedCert)
            mock('../persistedSettings', { getSettings })
            mock('fs', {readFileSync})
            mock('split-ca', () => expectedCa)
            const DockerManager = mock.reRequire('./dockerManager')
            sandbox.stub(DockerManager.prototype, '_initialize')
            dockerManager = new DockerManager({ ...course })

            let options = {}
            const expectedOptions = {
                'ca': expectedCa,
                'cert': expectedCert,
                'key': expectedCert
            }
            dockerManager._loadCert(options)
            expect(getSettings).to.have.been.calledOnce
            expect(readFileSync).to.have.been.calledTwice
            expect(options).to.deep.equal(expectedOptions)

            mock.stop('../persistedSettings')
            mock.stop('fs')
            mock.stop('split-ca')
        })

        it('should throw error if certificate not found', () => {
            mock.stop('../persistedSettings')
            getSettings = sandbox.stub().callsFake(() => '/directory/does/not/exist')
            const readFileSync = sandbox.stub().callsFake(() => expectedCert)
            mock('../persistedSettings', { getSettings })
            const DockerManager = mock.reRequire('./dockerManager')
            sandbox.stub(DockerManager.prototype, '_initialize')
            dockerManager = new DockerManager({ ...course })

            let options = {}

            expect(() => dockerManager._loadCert(options)).to.throw(/Cert not found. Reason: /)

            mock.stop('../persistedSettings')
        })

        it('should set tls option', () => {
            mock.stop('../persistedSettings')
            const expectedTLS = '1'
            getSettings = sandbox.stub().callsFake(() => expectedTLS)
            mock('../persistedSettings', { getSettings })
            const DockerManager = mock.reRequire('./dockerManager')
            sandbox.stub(DockerManager.prototype, '_initialize')
            dockerManager = new DockerManager({ ...course })

            const expectedOptions = {
                'checkServerIdentity': expectedTLS
            }
            let options = {}
            dockerManager._setTLS(options)

            expect(getSettings).to.have.been.calledOnce
            expect(options).to.deep.equal(expectedOptions)

            mock.stop('../persistedSettings')
        })

        it('should set default socket path if none is provided', () => {
            mock.stop('../persistedSettings')
            getSettings = sandbox.stub().callsFake(() => '')
            mock('../persistedSettings', { getSettings })
            const DockerManager = mock.reRequire('./dockerManager')
            sandbox.stub(DockerManager.prototype, '_initialize')
            dockerManager = new DockerManager({ ...course })
            const getDefaultSocket = sandbox.stub(dockerManager, '_getDefaultSocket')

            let options = {}

            dockerManager._setSocketPath(options)

            expect(getDefaultSocket).to.have.been.calledOnce

            mock.stop('../persistedSettings')
        })

        it('should set default socket path for windows', () => {
            mock.stop('os')
            type = sandbox.stub().callsFake(() => 'Windows_NT')
            mock('os', { type })
            const DockerManager = mock.reRequire('./dockerManager')
            sandbox.stub(DockerManager.prototype, '_initialize')
            dockerManager = new DockerManager({ ...course })

            let options = {}
            const expectedOptions = {
                'socketPath': '//./pipe/docker_engine'
            }
            dockerManager._getDefaultSocket(options)

            expect(expectedOptions).to.deep.equal(options)

            mock.stop('os')
        })

        it('should set default socket path for *nix based systems', () => {
            mock.stop('os')
            type = sandbox.stub().callsFake(() => 'linux')
            mock('os', { type })
            const DockerManager = mock.reRequire('./dockerManager')
            sandbox.stub(DockerManager.prototype, '_initialize')
            dockerManager = new DockerManager({ ...course })

            let options = {}
            const expectedOptions = {
                'socketPath': '/var/run/docker.sock'
            }
            dockerManager._getDefaultSocket(options)

            expect(expectedOptions).to.deep.equal(options)

            mock.stop('os')
        })

        it('should set provided socket path ', () => {
            mock.stop('../persistedSettings')
            const expectedPath = 'path/to/socket'
            getSettings = sandbox.stub().callsFake(() => `unix://${expectedPath}`)
            mock('../persistedSettings', { getSettings })
            const DockerManager = mock.reRequire('./dockerManager')
            sandbox.stub(DockerManager.prototype, '_initialize')
            dockerManager = new DockerManager({ ...course })

            let options = {}
            const expectedOptions = {
                'socketPath': expectedPath
            }
            dockerManager._setSocketPath(options)

            expect(expectedOptions).to.deep.equal(options)

            mock.stop('../persistedSettings')
        })
    })
})
