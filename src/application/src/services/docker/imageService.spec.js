const { fake, stub } = require('sinon')
const ImageService = require('./imageService')

describe('imageService.js', () => {
    const pull = stub()
    const remove = stub()
    const getImage = fake.resolves({
        remove
    })

    beforeEach('create new imageService', () => {
        docker = {
            pull,
            getImage,
            modem: {
                followProgress: fake((stream, cb) => {
                    cb(false, {})
                })
            }
        }
        imageService = new ImageService(docker)
    })

    describe('public methods', () => {

        it('should pull a new image', async () => {
            stub(imageService, "_validateImage").callsFake(() => {return 'lorem'})
            expect(imageService.images).to.be.an('array').that.is.empty
            await imageService.pull('ipsum')
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
    })
})
