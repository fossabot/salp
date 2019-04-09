const ImageService = require('./imageService')

describe('imageService.js', () => {
    let sandbox = require('sinon').createSandbox()
    const pull = sandbox.stub()
    const remove = sandbox.stub()
    const getImage = sandbox.fake.resolves({
        remove
    })

    beforeEach('create new imageService', () => {
        docker = {
            pull,
            getImage,
            modem: {
                followProgress: sandbox.fake((stream, cb) => {
                    cb(false, {})
                })
            }
        }
        imageService = new ImageService(docker)
    })

    afterEach(() => {
        sandbox.reset()
    })

    after(() => {
        sandbox.restore()
    })

    describe('public methods', () => {

        it('should pull a new image', async () => {
            const senderStub = sandbox.stub()
            sandbox.stub(imageService, "_validateImage").callsFake(() => {return 'lorem'})

            expect(imageService.images).to.be.an('array').that.is.empty

            await imageService.pull({send: senderStub}, 'ipsum')

            expect(senderStub).to.have.been.calledOnce
            expect(pull).to.have.been.calledOnce
            expect(imageService.images).to.be.an('array').that.is.not.empty
        })

        it('should remove all images', async () => {
            imageService.images = ['lorem', 'ipsum']
            expect(imageService.images).to.be.an('array').that.is.not.empty
            await imageService.removeAll()
            expect(remove).to.have.been.calledTwice
            expect(imageService.images).to.be.an('array').that.is.empty
        })
    })

    describe('private methods', () => {
        it('should validate the image tag', () => {
            let image = 'wp'
            expect(imageService._validateImage(image)).to.equal(`${image}:latest`)
            expect(imageService._validateImage(`${image}:fpm`)).to.equal(`${image}:fpm`)
        })

        it('should load images from course', () => {
            const expectedImage = 'lorem'
            imageService.course = {
                containers: {
                    'ipsum': {
                        Image: expectedImage
                    }
                }
            }
            imageService.images = []
            const validateImageStub = sandbox.stub(imageService, "_validateImage").callsFake(() => {return expectedImage})
            expect(imageService.images).to.be.an('array').that.is.empty
            imageService._loadImages()
            expect(validateImageStub).to.have.been.calledOnce
            expect(imageService.images).to.be.an('array').that.is.not.empty
        })
    })
})
