import { expect } from 'chai'
import { spy, stub } from 'sinon'
import utils, { createNamespacedHelpers } from './utils'

const testNamespace = 'some/nested/NameSpace'
const testMutationType = 'TEST_MUTATION'

const testPropName = 'someProp'
const testPropValue = 'someValue'
const testProp2Name = 'testProp'
const testProp2Value = 42

describe('Store utils: utils.js', () => {
    describe('#normalizeNamespace()', () => {
        const normalizeNamespace = utils.__get__('normalizeNamespace')

        // fixtures
        const testMap = [
            'prop1',
            'prop2'
        ]

        let result
        const spyFunc = spy()
        let normalizeMapStub

        before('stub #normalizeMap()', () => {
            normalizeMapStub = stub()
            normalizeMapStub.returnsArg(0)

            utils.__Rewire__('normalizeMap', normalizeMapStub)
        })

        after('reset #normalizeMap() stub', () => {
            utils.__ResetDependency__('normalizeMap')
        })

        beforeEach('normalize function (spy)', () => {
            spyFunc.resetHistory()
            normalizeMapStub.resetHistory()

            result = normalizeNamespace(spyFunc)
        })

        // tests
        it('should return a function', () => {
            expect(result).to.be.a('function')
        })

        it('should call normalized function with normalized map', () => {
            result(testNamespace, testMutationType, testMap)

            expect(normalizeMapStub).to.have.been.calledWith(testMap)
        })

        it('should call normalized function with namespace, mutationType and map', () => {
            result(testNamespace, testMutationType, testMap)

            expect(spyFunc).to.have.been.calledWith(testNamespace + '/', testMutationType, testMap)
        })

        it('should call normalized function with empty namespace, mutationType and map when namespace is omitted', () => {
            result(testMutationType, testMap)

            expect(spyFunc).to.have.been.calledWith('', testMutationType, testMap)
        })

        const textTrailingSlash = `'/' (slash)`
        describe(`enforces trailing ${textTrailingSlash} on namespace`, () => {
            const namespaceWithoutSlash = 'nested/namespace'
            const namespaceWithSlash = `${namespaceWithoutSlash}/`

            it(`should append trailing ${textTrailingSlash} on namespace without trailing slash`, () => {
                result(namespaceWithoutSlash, '', [])

                expect(spyFunc).to.have.been.calledWith(namespaceWithSlash)
            })

            it(`should not append trailing ${textTrailingSlash} on namespace with trailing slash`, () => {
                result(namespaceWithSlash, '', [])

                expect(spyFunc).to.have.been.calledWith(namespaceWithSlash)
            })

            it(`should not append ${textTrailingSlash} when namespace is omitted`, () => {
                result('', [])

                expect(spyFunc).to.have.been.calledWith('')
            })
        })
    })

    describe('#normalizeMap()', () => {
        const normalizeMap = utils.__get__('normalizeMap')

        // fixtures
        const expectedNormalizedMaps = [
            {
                name: 'object',
                value: {
                    [testPropName]: testPropValue,
                    [testProp2Name]: testProp2Value
                },
                expect: [
                    { key: testPropName, val: testPropValue },
                    { key: testProp2Name, val: testProp2Value }
                ]
            },
            {
                name: 'array',
                value: [
                    testPropName,
                    testProp2Name
                ],
                expect: [
                    { key: testPropName, val: testPropName },
                    { key: testProp2Name, val: testProp2Name }
                ]
            }
        ]

        expectedNormalizedMaps.forEach(test => {
            it(`should map ${test.name}`, () => {
                const res = normalizeMap(test.value)

                expect(res).to.deep.equal(test.expect)
            })
        })
    })

    describe('#createNamespacedHelpers()', () => {
        const expectedHelperFunctions = [
            'mapStateTwoWay'
        ]

        const target = createNamespacedHelpers()

        expectedHelperFunctions.forEach(func => {
            it(`should have created helper '${func}'`, () => {
                expect(target).to.have.property(func).to.be.a('function')
            })
        })
    })

    describe('#mapStateTwoWay()', () => {
        const mapStateTwoWay = utils.__get__('mapStateTwoWay')

        // helpers
        function callMapperWithFields(fields) {
            return mapStateTwoWay(testNamespace, testMutationType, fields)
        }

        // tests
        it('should return object with all given properties', () => {
            const expectedFields = [
                'prop1',
                'someOtherField',
                'last'
            ]

            expect(callMapperWithFields(expectedFields)).to.have.all.keys(expectedFields)
        })

        it('should return object with mapped properties', () => {
            const testProp3Name = 'additionalProp'

            const expectedMapping = {
                [testPropName]: testProp2Name,
                [testProp3Name]: testProp3Name
            }

            expect(callMapperWithFields(expectedMapping)).to.have.all.keys(Object.keys(expectedMapping))
        })

        describe('single computed field (one entry in result)', () => {
            const testFieldName = 'testProp'

            let entry
            let getModuleByNamespaceStub

            // helpers
            before('stub #getModuleByNamespace', () => {
                getModuleByNamespaceStub = stub()

                utils.__Rewire__('getModuleByNamespace', getModuleByNamespaceStub)
            })

            after('reset #getModuleByNamespace stub', () => {
                utils.__ResetDependency__('getModuleByNamespace')
            })

            beforeEach('prepare entry', () => {
                entry = callMapperWithFields([testFieldName])[testFieldName]
            })

            beforeEach(`reset getModuleByNamespaceStub's behaviour`, () => {
                getModuleByNamespaceStub.returns(false)
            })

            // tests
            it('should have a #get() and #set() function', () => {
                const functionProperties = ['get', 'set']

                functionProperties.forEach(funcProp => {
                    expect(entry).to.have.property(funcProp).to.be.a('function')
                })
            })

            it('should have the vuex devtools hint', () => {
                expect(entry).to.have.property('vuex').to.be.true
            })

            describe('calling getter', () => {
                it('should invoke #getModuleByNamespace ', () => {
                    entry.get()

                    expect(getModuleByNamespaceStub).to.have.been.calledOnce
                })

                it('should return nothing (undefined) when namespace not found', () => {
                    const res = entry.get()

                    expect(res).to.be.undefined
                })

                it(`should return value of field's name in store`, () => {
                    const testValue = 'someVerySpecificTestValue'

                    const module = {
                        context: {
                            state: {
                                [testFieldName]: testValue
                            }
                        }
                    }

                    getModuleByNamespaceStub.returns(module)

                    const res = entry.get()

                    expect(res).to.equal(testValue)
                })
            })

            describe('calling setter', () => {
                const commitSpy = spy()
                const testValue = 'someValue'

                // helpers
                function injectSetterSpy(setterFunc) {
                    return setterFunc.bind({
                        $store: {
                            commit: commitSpy
                        }
                    })
                }

                beforeEach('reset commit spy', () => {
                    commitSpy.resetHistory()
                })

                // tests
                it(`should commit ${testMutationType}`, () => {
                    entry = mapStateTwoWay(testMutationType, [testFieldName])[testFieldName]

                    const setter = injectSetterSpy(entry.set)

                    setter(testValue)

                    expect(commitSpy).to.have.been.calledOnce
                    expect(commitSpy.firstCall.lastArg).to.have.property('type', testMutationType)
                })

                it(`should commit ${testMutationType} with prefixed namespace`, () => {
                    entry = mapStateTwoWay(testNamespace, testMutationType, [testFieldName])[testFieldName]

                    const setter = injectSetterSpy(entry.set)

                    setter(testValue)

                    expect(commitSpy).to.have.been.calledOnce
                    expect(commitSpy.firstCall.lastArg).to.have.property('type', `${testNamespace}/${testMutationType}`)
                })

                it(`should commit with using the field's name and given value`, () => {
                    entry = mapStateTwoWay(testMutationType, [testFieldName])[testFieldName]

                    const setter = injectSetterSpy(entry.set)

                    setter(testValue)

                    expect(commitSpy.firstCall.lastArg).to.include({
                        name: testFieldName,
                        value: testValue
                    })
                })
            })
        })
    })
})
