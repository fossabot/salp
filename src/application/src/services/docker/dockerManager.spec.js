let DockerManager = require('./dockerManager')
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

    before(() => {
        sandbox.stub(DockerManager.prototype, '_initialize')

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
        dockerManager = new DockerManager({ ...course })
    })

    afterEach(() => {
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
})
