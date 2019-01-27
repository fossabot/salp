const { fake, stub } = require('sinon')
const NetworkService = require('./networkService')

describe('networkService.js', () => {
    const courseName = 'lorem'
    let networkName = courseName.trim().replace(/\s/g, '')
    networkName = `salp_${networkName}_network`
    const Id = '123'

    const remove = stub()
    const getNetwork = fake.resolves({
        remove
    })
    const createNetwork = fake.resolves({
        Name: networkName
    })
    const listNetworks = fake.resolves(
        [{Name: networkName, Id}]
    )

    beforeEach('create new networkService', () => {
        docker = {
            listNetworks,
            getNetwork,
            createNetwork
        }
        networkService = new NetworkService(docker, courseName)
    })

    describe('public methods', () => {
        it('should create a new network', async () => {
            stub(networkService, "_loadNetwork")
            expect(networkService.network).to.be.undefined
            networkService.networkName = networkName
            await networkService.create()
            expect(networkService.network).to.be.not.undefined
            expect(createNetwork).to.have.been.calledOnce
        })

        it('should remove the network', async () => {
            await networkService._loadNetwork()
            expect(networkService.networkName).to.be.not.undefined
            expect(networkService.network).to.be.not.undefined
            await networkService.remove()
            expect(networkService.networkName).to.be.undefined
            expect(networkService.network).to.be.undefined
        })

        it('should return the network name', async () =>{
            const name = await networkService.getNetworkName()
            expect(name).to.equal(networkName)
        })
    })

    describe('private methods', () => {
        it('should load network if one exsits', async () => {
            stub(networkService, "_getNetworkName").callsFake(() => {return networkName})
            expect(networkService.networkName).to.be.undefined
            expect(networkService.network).to.be.undefined
            await networkService._loadNetwork()
            expect(networkService.networkName).to.be.not.undefined
            expect(networkService.network).to.be.not.undefined
        })

        it('should get the network name', () => {
            expect(networkService._getNetworkName()).to.equal(networkName)
        })
    })
})
