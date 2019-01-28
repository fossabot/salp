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
    let removeAllImage
    let removeNetwork
    let createNetwork

    before(() => {
        createNetwork = sandbox.stub(NetworkService.prototype, 'create')
        removeNetwork = sandbox.stub(NetworkService.prototype, 'remove')

        pull = sandbox.stub(ImageService.prototype, 'pull')
        removeAllImage = sandbox.stub(ImageService.prototype, 'removeAll')

        createContainer = sandbox.stub(ContainerService.prototype, 'create')
        startContainer = sandbox.stub(ContainerService.prototype, 'start')
        stopContainer = sandbox.stub(ContainerService.prototype, 'stop')
        removeAllContainer = sandbox.stub(ContainerService.prototype, 'removeAll')
    })

    beforeEach('create new dockerManager', () => {
        dockerManager = new DockerManager({ ...course })
    })

    afterEach('', () => {
        sandbox.reset()
    })

    after(() => {
        sandbox.restore()
    })

    describe('public methods', () => {
        it('should start up the docker container', async () => {
            await dockerManager.up()
            expect(createNetwork).to.have.been.calledOnce
            expect(pull).to.have.been.calledOnce
            expect(createContainer).to.have.been.calledOnce
            expect(startContainer).to.have.been.calledOnce
        })

        it('should stop the docker container', async () => {
            await dockerManager.down()
            expect(stopContainer).to.have.been.calledOnce
        })

        it('should remove all container, images and network', async () => {
            const down = sandbox.stub(dockerManager, 'down')
            await dockerManager.removeAll()
            expect(down).to.have.been.calledOnce
            expect(removeAllContainer).to.have.been.calledOnce
            expect(removeAllImage).to.have.been.calledOnce
            expect(removeNetwork).to.have.been.calledOnce
        })

        it('should remove container and network, but no images', async () => {
            const down = sandbox.stub(dockerManager, 'down')
            await dockerManager.removeContainersAndNetwork()
            expect(removeAllContainer).to.have.been.calledOnce
            expect(removeNetwork).to.have.been.calledOnce
            expect(removeAllImage).to.not.have.been.calledOnce
        })
    })
})
