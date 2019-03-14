const { createSandbox, createStubInstance } = require('sinon')
const rewire = require('rewire')

// subject dependencies
const Store = require('./Store')

// subject
const PersistenceManager = rewire('./PersistenceManager')

const { stub, spy, reset, restore } = createSandbox()

describe('PersistenceManager', () => {
    let manager,
        StoreStub,
        StoreStubInstance,
        resetStoreStub

    before('stub Store', () => {
        StoreStub = spy(function() {
            return StoreStubInstance = createStubInstance(Store)
        })

        resetStoreStub = PersistenceManager.__set__('Store', StoreStub)
    })

    after(() => {
        resetStoreStub()
        restore()
    })

    beforeEach('initialize manager', () => {
        manager = new PersistenceManager()
    })

    afterEach(() => {
        reset()
    })

    it('should have no store by default', () => {
        expect(manager.stores).to.be.empty
    })

    describe('#get', () => {
        it('should return existing store', () => {
            const existingStoreName = '__ThisStoreExistsInTesting__'

            manager.stores[existingStoreName] = 42

            expect(manager.get(existingStoreName)).to.equal(42)
        })

        it('should return undefined if store does not exist', () => {
            const result = manager.get('__ThisStoreDoesNotExist__')

            expect(result).to.be.undefined
        })
    })

    describe('#has', () => {
        it('should return true, if the store exists', () => {
            const testStoreName = '__HasStore__'
            manager.stores[testStoreName] = 45

            const result = manager.has(testStoreName)
            expect(result).to.be.true
        })

        it('should return false, if the store does not exist', () => {
            const testStoreName = '__HasOtherStore__'

            const result = manager.has(testStoreName)
            expect(result).to.be.false
        })
    })

    describe('#create', () => {
        it('should save reference to newly created', () => {
            const testStoreName = '__testStore__'
            stub(manager, '_create').returns(42)

            manager.create(testStoreName)

            expect(manager.stores).to.have.property(testStoreName, 42)
        })

        it('should throw an error if a store already exists', () => {
            const testStoreName = '__someTestStore__'
            manager.create(testStoreName)

            expect(function createSameStoreAgain() {
                manager.create(testStoreName)
            }).to.throw(Error, 'already exists')
        })

        it('should call Store.loadOrCreate() when creating new store', () => {
            const loadOrCreateStub = StoreStubInstance.loadOrCreate

            manager._create('__finalTestStore__')

            expect(loadOrCreateStub).to.have.been.calledOnce
        })
    })
})
