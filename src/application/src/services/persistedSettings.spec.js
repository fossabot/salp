const path = require('path')
const rewire = require('rewire')
const mockRequire = require('mock-require')
const { stub } = require('sinon')
const { app: appMock, ipcMain: ipcMainMock } = require('../../__mocks__/electron')

const userDataPath = '/tmp/_salp_application_test/user_data'

describe('persisted settings service', () => {
    let persistedSettings,
        appStub,
        ipcMainStub

    before('inject electron hook', () => {
        appStub = stub(appMock)
        ipcMainStub = stub(ipcMainMock)
        appStub.getPath.returns(userDataPath)
        mockRequire('electron', { app: appStub, ipcMain: ipcMainStub })

        persistedSettings = rewire('./persistedSettings')
    })

    after('reset mock-require', () => {
        mockRequire.stop('electron')
    })

    afterEach('reset stubs', () => {
        [appStub, ipcMainStub].forEach(stubs => {
            Object.values(stubs).forEach(s => {
                s.reset()
            })
        })
    })

    it('should export an init function', () => {
        expect(persistedSettings).to.be.a('function')
    })

    it('should register ipcMain events in init function on app "ready" event', async () => {
        const ensureSettingsDirStub = stub()
        const revertEnsureSettingsDirStub = persistedSettings.__set__('ensureSettingsDir', ensureSettingsDirStub)

        // call init function
        persistedSettings()

        const handler = appStub.on.args[0][1]

        await handler()

        expect(ipcMainStub.on).to.have.been.calledTwice

        revertEnsureSettingsDirStub()
    })

    describe('private function #ensureSettingsDir', () => {
        let subject, fsMkdirStub

        before('get test subject and stub fs.mkdir', () => {
            fsMkdirStub = stub()
            persistedSettings.__set__('fs', { mkdir: fsMkdirStub })

            subject = persistedSettings.__get__('ensureSettingsDir')
        })

        afterEach('reset fs.mkdir stub', () => {
            fsMkdirStub.reset()
        })

        it('should call fs.mkdir', async () => {
            await subject()

            expect(fsMkdirStub).to.have.been.calledOnce
        })

        it('should not throw "file exists" error', async () => {
            const expectedError = new Error('File exists')
            expectedError.code = 'EEXIST'
            fsMkdirStub.throws(expectedError)

            // call async function to retrieve a Promise
            await expect(subject()).not.to.be.rejected
        })

        it('should throw any error in case of an error', async () => {
            const expectedError = new Error('Some error')
            fsMkdirStub.throws(expectedError)

            // call async function to retrieve a Promise
            await expect(subject()).to.be.rejectedWith(expectedError)
        })
    })

    describe('private function #getSettingsFileName', () => {
        let subject, pathResolveStub

        before('get test subject and stub path.resolve', () => {
            pathResolveStub = stub()
            persistedSettings.__set__('path', { resolve: pathResolveStub })

            subject = persistedSettings.__get__('getSettingsFileName')
        })

        afterEach('reset path.resolve stub', () => {
            pathResolveStub.reset()
        })

        it('should resolve settings file name with ".json" suffix', () => {
            pathResolveStub.returnsArg(1)
            const expectedFileName = '_some_file_name_'

            const result = subject(expectedFileName)

            expect(result.replace(expectedFileName, '')).to.equal('.json')
        })

        it('should resolve file in settings dir', () => {
            const settingsDir = userDataPath + '/_the_settings_dir'
            const revertSettingsDir = persistedSettings.__set__('settingsDir', settingsDir)
            const expectedFileName = '_some_file_name_'
            pathResolveStub.callsFake(path.resolve)

            const result = subject(expectedFileName)

            expect(result).to.contain(settingsDir)

            revertSettingsDir()
        })
    })

    describe('private function #settingsLoadHandler', () => {
        let subject,
            readSettingsFileStub,
            writeSettingsFileStub,
            event

        before('get test subject and inject stubs', () => {
            readSettingsFileStub = stub()
            writeSettingsFileStub = stub()
            persistedSettings.__set__('readSettingsFile', readSettingsFileStub)
            persistedSettings.__set__('writeSettingsFile', writeSettingsFileStub)
            event = {
                sender: {
                    send: stub()
                }
            }

            subject = persistedSettings.__get__('settingsLoadHandler')
        })

        afterEach('reset stubs', () => {
            readSettingsFileStub.reset()
            writeSettingsFileStub.reset()
            event.sender.send.reset()
        })

        it('should not throw "file not exists" error and instead write new file', async () => {
            const expectedError = new Error('File does not exist error')
            expectedError.code = 'ENOENT'
            const expectedFileName = '_some_new_settings_file_'
            readSettingsFileStub.throws(expectedError)

            // call async function to retrieve a Promise
            await expect(subject({}, expectedFileName)).not.to.be.rejected
            expect(writeSettingsFileStub).to.have.been.calledWith(expectedFileName)
        })

        it('should throw any error in case of an read error', async () => {
            const expectedError = new Error('Some other read error')
            readSettingsFileStub.throws(expectedError)

            // call async function to retrieve a Promise
            await expect(subject({}, null)).to.be.rejectedWith(expectedError)
        })

        it('should call sender with read content from settings file', async () => {
            const expectedFileName = '_another_settings_file_'
            const expectedContent = '{ "data": "some settings content" }'
            readSettingsFileStub.resolves(expectedContent)

            await subject(event, expectedFileName)

            expect(event.sender.send).have.been.calledWith('settings:loaded:' + expectedFileName, JSON.parse(expectedContent))
        })

        describe('private function #settingsLoadHandler', () => {
            let subject,
                writeSettingsFileStub,
                event

            before('get test subject and inject stubs', () => {
                writeSettingsFileStub = stub()
                persistedSettings.__set__('writeSettingsFile', writeSettingsFileStub)
                event = {
                    sender: {
                        send: stub()
                    }
                }

                subject = persistedSettings.__get__('settingsSaveHandler')
            })

            afterEach('reset stubs', () => {
                writeSettingsFileStub.reset()
                event.sender.send.reset()
            })

            it('should write contents to file and call sender', async () => {
                const expectedFileName = '_one_settings_file_'
                const expectedContent = { "data2": "more settings content" }

                await subject(event, expectedFileName, expectedContent)

                expect(writeSettingsFileStub).to.have.been.calledWith(expectedFileName, JSON.stringify(expectedContent))
                expect(event.sender.send).to.have.been.calledWith('settings:saved:' + expectedFileName)
            })
        })
    })
})
