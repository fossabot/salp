const { createSandbox, createStubInstance } = require('sinon')
const rewire = require('rewire')

// subject dependencies
const { app } = require('electron')
const fs = require('fs')
const path = require('path')
const { log } = require('../log')
const { persistedSettingsDir } = require('../../constants')

// subject
const Store = rewire('./Store')

const { stub, spy, reset, restore } = createSandbox()

describe('Store', () => {
    const appPathUserData = '/tests/__home'
    const testSettingsDir = path.join(appPathUserData, persistedSettingsDir)

    let fsMkdirSyncStub,
        pathJoinSpy,
        appGetPathStub,
        resetApp,
        logErrorStub

    before('stub APIs', () => {
        fsMkdirSyncStub = stub(fs, 'mkdirSync')

        pathJoinSpy = spy(path, 'join')

        logErrorStub = stub(log, 'error')
    })

    after(() => {
        restore()
    })

    beforeEach(() => {
        appGetPathStub = stub().returns(appPathUserData)
        resetApp = Store.__set__('app', { getPath: appGetPathStub })
    })

    afterEach(() => {
        resetApp()
        reset()
    })

    describe('constructor', () => {
        const testStoreName = '__some_name__'
        let store

        beforeEach(() => {
            store = new Store(testStoreName)
        })

        it('should initialize with empy data', () => {
            expect(store._data).to.be.empty
        })

        it('should resolve settings path and filename', () => {
            expect(store.path).to.equal(`${testSettingsDir}/${testStoreName}.json`)
            expect(pathJoinSpy).to.have.been.calledTwice
        })

        it('should ensure the settingsDir exist', () => {
            const testStoreName = '__some_other_test_name__'

            const ensureDirStub = stub()
            const resetEnsureDir = Store.__set__('ensureDir', ensureDirStub)

            store = new Store(testStoreName)

            expect(ensureDirStub).to.have.been.calledWith(testSettingsDir)

            resetEnsureDir()
        })
    })

    describe('#load', () => {
        let fsReadFileSyncStub,
            store

        before(() => {
            fsReadFileSyncStub = stub(fs, 'readFileSync')
        })

        beforeEach(() => {
            store = new Store('__test_store_load')
        })

        afterEach(() => {
            reset()
        })

        it('should read file from fs', () => {
            const testStorePath = '/tests/other_home/some/path/file.json'
            fsReadFileSyncStub.returns('{}')

            store.path = testStorePath

            store.load()
            expect(fsReadFileSyncStub).to.have.been.calledWith(testStorePath)
        })

        it('should update internal data after reading', () => {
            const expectedData = { some: { nested: { value: 42 } } }
            fsReadFileSyncStub.returns(JSON.stringify(expectedData))

            store.load()
            expect(store._data).to.deep.equal(expectedData)
        })

        it('should log and throw any error', () => {
            const testError = '_test_error_msg_load'
            fsReadFileSyncStub.throws({ code: 'EANY', message: testError })

            expect(() => {
                store.load()
            }).to.throw(testError)

            expect(logErrorStub).to.have.been.calledOnce
        })
    })

    describe('#loadOrCreate', () => {
        let store

        beforeEach(() => {
            store = new Store('__test_store_loadOrCreate')
        })

        it('should try to load first', () => {
            const loadStub = stub(store, 'load')

            store.loadOrCreate()

            expect(loadStub).to.have.been.calledOnce
        })

        it('should create a settings file if it does not exist', () => {
            const loadStub = stub(store, 'load')
            const saveStub = stub(store, 'save')
            loadStub.throws({ code: 'ENOENT' })

            store.loadOrCreate()

            expect(saveStub).to.have.been.calledOnce
        })

        it('should throw an error if load threw any error', () => {
            const testErrorMessage = '__test_loadOrCreate_EANY'
            const loadStub = stub(store, 'load')
            loadStub.throws({ code: 'EANY', message: testErrorMessage })

            expect(() => {
                store.loadOrCreate()
            }).to.throw(testErrorMessage)
        })

        it('should thrown an error if load and save failed', () => {
            const testErrorMessage = '__test_loadOrCreate_ESAVE'
            const loadStub = stub(store, 'load')
            const saveStub = stub(store, 'save')
            loadStub.throws({ code: 'ENOENT' })
            saveStub.throws({ code: 'EANY', message: testErrorMessage })

            expect(() => {
                store.loadOrCreate()
            }).to.throw(testErrorMessage)
        })
    })

    describe('#save', () => {
        let fsWriteFileSyncStub,
            store

        before(() => {
            fsWriteFileSyncStub = stub(fs, 'writeFileSync')
        })

        beforeEach(() => {
            store = new Store('__test_store_save')
        })

        afterEach(() => {
            reset()
        })

        it('should write JSON stringified data to file', () => {
            const testData = { some: { more_nested: { data: 42 } } }
            store._data = testData

            store.save()

            expect(fsWriteFileSyncStub).to.have.been.calledWith(store.path, JSON.stringify(testData))
        })

        it('should log and throw any error', () => {
            const testError = '_test_error_msg_load'
            fsWriteFileSyncStub.throws({ code: 'EANY', message: testError })

            expect(() => {
                store.save()
            }).to.throw(testError)

            expect(logErrorStub).to.have.been.calledOnce
        })
    })

    describe('#get', () => {
        it('should return values from data', () => {
            store = new Store('__test_store_get')

            const testDataName = 'some_var'
            const testDataValue = 42

            store._data[testDataName] = testDataValue

            expect(store.get(testDataName)).to.equal(testDataValue)
        })
    })

    describe('#set', () => {
        let store,
            saveStub

        beforeEach(() => {
            store = new Store('__test_store_set')
            saveStub = stub(store, 'save')
        })

        afterEach(() => {
            reset()
        })

        it('should set values to internal data', () => {
            const testDataName = 'some_other_var'
            const testDataValue = 100

            store.set(testDataName, testDataValue)
            expect(store._data).to.have.property(testDataName, testDataValue)
        })

        it('should immediately save the new state/data', () => {
            store.set('my_var', true)

            expect(saveStub).to.have.been.calledOnce
        })
    })

    describe('#has', () => {
        let store

        beforeEach(() => {
            store = new Store('__test_store_has')
        })

        it('should return false if setting does not exist', () => {
            const result = store.has('__test_non_existing_var__')

            expect(result).to.be.false
        })

        it('should return true if setting exists', () => {
            const testDataName = '__test_existing_var__'
            store._data[testDataName] = 42

            const result = store.has(testDataName)

            expect(result).to.be.true
        })
    })

    describe('#getAll', () => {
        it('should return all internal data', () => {
            store = new Store('__test_store_getAll')

            const testData = { another: { test: { nested: 'data' } } }
            store._data = testData

            expect(store.getAll()).to.deep.equal(testData)
        })
    })

    describe('_ensureDir', () => {
        const ensureDir = Store.__get__('ensureDir')

        it('should create a path recursively', () => {
            const testPath = 'some/nested/path'

            ensureDir(testPath)

            expect(fsMkdirSyncStub).to.have.been.calledWithExactly(testPath, { recursive: true })
        })

        it('should not throw an error if the dir already exists', () => {
            fsMkdirSyncStub.throws({ code: 'EEXIST' })

            expect(() => {
                ensureDir('')
            }).not.to.throw()
        })

        it('should throw if any error occurred', () => {
            fsMkdirSyncStub.throws({ code: 'EANY', message: '__testing_internal__' })

            expect(() => {
                ensureDir('')
            }).to.throw('__testing_internal__')
        })
    })
})
