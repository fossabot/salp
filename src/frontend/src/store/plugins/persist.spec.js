import { expect } from 'chai'
import { spy, stub } from 'sinon'
import createPersistPlugin from '@/store/plugins/persist'
import { userInputDebounceTimer } from '@/constants'

const testPluginName = 'testplugin'

function createPlugin(namespace = '', opts = {}) {
    return createPersistPlugin(
        testPluginName,
        namespace,
        opts
    )
}

const testPropName = 'testProp'
const testPropValue = 'testValue'
const testProp2Name = 'someProp'
const testProp2Value = 0
const testProp2Value2 = 42

function pendingTestWithDefaultArgs() {
    it('should also work with default options')
}

describe('Vuex Persist Plugin: persist.js', () => {
    const mutationType = 'TEST_SET_PROP'
    const mutationTypeAll = `${mutationType}_ALL`
    const getterType = 'TEST_GET_PROP'
    const loadAction = 'TEST_ACTION_LOAD'
    const saveAction = 'TEST_ACTION_SAVE'
    const skipSaveFlag = '$skipSave'

    // fixtures
    let store, plugin

    // helpers
    async function subscribeHandlerTest(dispatchSpy, payload = {}) {
        const subscribeSpy = spy()

        await plugin({ dispatch: dispatchSpy, subscribe: subscribeSpy })
        dispatchSpy.resetHistory()

        const subscribeHandler = subscribeSpy.firstCall.lastArg

        subscribeHandler({
            type: mutationType,
            payload: payload
        })
    }

    beforeEach('create new plugin', () => {
        const output = createPlugin('', {
            mutationType,
            getterType,
            loadAction,
            saveAction
        })
        plugin = output.plugin
        store = output.store
    })

    // tests
    it('should provide plugin instance and store extensions', () => {
        expect(plugin).to.be.a('function')
        expect(store).to.be.an('object')
    })

    it('should dispatch load action on plugin init', async () => {
        const dispatchSpy = spy()

        await plugin({ dispatch: dispatchSpy, subscribe: stub() })

        expect(dispatchSpy).to.have.been.calledOnce
    })

    it('should subscribe to store changes', async () => {
        const subscribeSpy = spy()

        await plugin({ dispatch: stub(), subscribe: subscribeSpy })

        expect(subscribeSpy).to.have.been.calledOnce
        expect(subscribeSpy.firstCall.lastArg).to.be.a('function')
    })

    it(`should not subscribe if 'immediate' == false`, async () => {
        const output = createPlugin('', {
            immediate: false
        })

        plugin = output.plugin

        const subscribeSpy = spy()

        await plugin({ dispatch: stub(), subscribe: subscribeSpy })

        expect(subscribeSpy).to.have.not.been.called
    })

    it(`should dispatch '${saveAction}' when state changed through '${mutationType}'`, async function() {
        this.timeout(userInputDebounceTimer + 250)

        const dispatchSpy = spy()

        await subscribeHandlerTest(dispatchSpy)

        setTimeout(() => expect(dispatchSpy).to.have.been.calledWith(saveAction), userInputDebounceTimer)
    })

    it(`should not dispatch '${saveAction}' when state changed through '${mutationType}' with '${skipSaveFlag}' flag`, async function() {
        this.timeout(userInputDebounceTimer + 250)

        const dispatchSpy = spy()

        await subscribeHandlerTest(dispatchSpy, {
            [skipSaveFlag]: true
        })

        setTimeout(() => expect(dispatchSpy).to.have.not.been.called, userInputDebounceTimer)
    })

    it(`should test 'getNamespacedType' function`)

    describe('provided store extensions', () => {
        // test fixtures
        let testState

        // test helpers
        function commitMutationOnTestState(mutationType, args) {
            const mutation = store.mutations[mutationType]

            mutation(testState, args)
        }

        beforeEach('reset test state', () => {
            testState = {
                [testProp2Name]: testProp2Value
            }
        })

        // tests
        pendingTestWithDefaultArgs()

        const expectedFunctions = {
            getters: [getterType],
            mutations: [mutationType, mutationTypeAll]
        }

        Object.entries(expectedFunctions).forEach(([type, funcs]) => {
            funcs.forEach(funcName => {
                it(`should have ${type.slice(0, type.length - 1)} '${funcName}'`, () => {
                    expect(store[type]).to.have.property(funcName).to.be.a('function')
                })
            })
        })

        const expectedMutationUpdates = [
            {
                name: 'SET',
                performMutations() {
                    commitMutationOnTestState(mutationType, {
                        name: testPropName,
                        value: testPropValue
                    })

                    commitMutationOnTestState(mutationType, {
                        name: testProp2Name,
                        value: testProp2Value2
                    })
                }
            },
            {
                name: 'SET_ALL',
                performMutations() {
                    const props = {
                        [testPropName]: testPropValue,
                        [testProp2Name]: testProp2Value2
                    }

                    commitMutationOnTestState(mutationTypeAll, {
                        props
                    })
                }
            }
        ]

        expectedMutationUpdates.forEach(update => {
            it(`should set or update any property using the mutation '${update.name}'`, () => {
                update.performMutations()

                expect(testState).to.have.property(testPropName).to.equal(testPropValue)
                expect(testState).to.have.property(testProp2Name).to.equal(testProp2Value2)
            })
        })
    })

    describe('protocol', () => {
        let ipcRendererSpy
        const testState = {
            [testPropName]: testPropValue,
            [testProp2Name]: testProp2Value2
        }

        // helpers
        async function callAction(actionName, args) {
            if (!args) {
                args = {
                    commit: () => !1
                }
            }

            return store.actions[actionName](args)
        }

        function getSettingsLoadedHandler() {
            return ipcRendererSpy.once.firstCall.lastArg
        }

        beforeEach('setup ipcRenderer mock/spy', () => {
            ipcRendererSpy = {
                once: spy(),
                send: spy()
            }

            createPersistPlugin.__Rewire__('ipcRenderer', ipcRendererSpy)
        })

        after('reset ipcRenderer rewiring', () => {
            createPersistPlugin.__ResetDependency__('ipcRenderer')
        })

        // tests
        pendingTestWithDefaultArgs()

        it(`should send 'settings:save' IPC message and register 'settings:loaded' handler when dispatching loading action`, async () => {
            await callAction(loadAction)

            expect(ipcRendererSpy.send).to.have.been.calledWith('settings:load', testPluginName)
            expect(ipcRendererSpy.once).to.have.been.calledWith(`settings:loaded:${testPluginName}`)
            expect(getSettingsLoadedHandler()).to.be.a('function')
        })

        it(`should commit '${mutationTypeAll}' with hydrated data when main process finished loading settings`, async () => {
            const commitSpy = spy()
            await callAction(loadAction, { commit: commitSpy })

            const loadHandler = getSettingsLoadedHandler()
            loadHandler(null, testState)

            expect(commitSpy.firstCall.args[0]).to.deep.equal({
                type: mutationTypeAll,
                props: testState
            })
        })

        it(`should send 'settings:save' IPC message with name and current state to main process`, async () => {
            await callAction(saveAction, { state: testState })

            expect(ipcRendererSpy.send).to.have.been.calledWith('settings:save', testPluginName)
            expect(ipcRendererSpy.send.firstCall.lastArg).to.deep.equal(testState)
        })
    })

    it('should also work with namespaces')
})
