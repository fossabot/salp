import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { namespace, types } from '@/store/modules/AppState.js'
import { BASE_IP } from '@/store/modules/settings/docker'
import Containers from './Containers.vue'
import { stub } from 'sinon'
import { Table } from 'element-ui'
import formatBytes from '@/utils/formatBytes.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Containers.vue', () => {
    const expectedImage = 'lorem'
    const expectedState = 'running'
    const expectedPort = ['23342']
    const expectedBaseIp = '127.0.0.1'
    const expectedCourseName = 'ipsum'
    const expectedContainerName = `salp_${expectedCourseName}_${expectedImage}`

    const containers = {
        [expectedImage]: {}
    }

    let wrapper
    let containerStatus
    let containerPorts
    let getters
    let store

    beforeEach(() => {
        containerStatus = stub().callsFake(() => expectedState)
        containerPorts = stub().callsFake(() => expectedPort)

        getters = {
            [`${namespace}/${types.GET_CONTAINER_STATUS}`]: (state) => containerStatus,
            [`${namespace}/${types.GET_CONTAINER_PORTS_SIMPLE}`]: (state) => containerPorts
        }

        store = new Vuex.Store({
            state: {
                settings: {
                    docker: {
                        [BASE_IP]: expectedBaseIp
                    }
                }
            },
            getters
        })

        wrapper = mount(Containers, {
            store,
            localVue,
            propsData: {
                images: containers,
                courseName: expectedCourseName
            }
        })
    })

    it('should generate tableData', () => {
        expect(containerStatus).to.have.been.calledOnce
        expect(containerStatus).to.have.been.calledWith(expectedContainerName)
        expect(containerPorts).to.have.been.calledOnce
        expect(containerPorts).to.have.been.calledWith(expectedContainerName)

        const expectedTableData = [{
            'image': expectedImage,
            'status': expectedState,
            'ports': expectedPort
        }]
        const tableData = wrapper.vm.tableData
        expect(tableData).to.deep.equal(expectedTableData)
    })

    it('should render table', () => {
        expect(wrapper.find(Table).exists()).to.be.true
    })

    describe('it should display bytes in human-readable format', () => {
        const expectedValues = [
            { bytes: 0, decimals: 2, label: true, expected: '0 Bytes' },
            { bytes: 0, decimals: 2, label: false, expected: '0 Bytes' },
            { bytes: 100, decimals: 2, label: false, expected: '100' },
            { bytes: 100, decimals: 2, label: true, expected: '100 Bytes' },
            { bytes: 1024, decimals: 2, label: true, expected: '1 KB' },
            { bytes: 1239.04, decimals: 2, label: true, expected: '1.21 KB' },
            { bytes: 1240.064, decimals: 3, label: true, expected: '1.211 KB' },
            { bytes: 1048576, decimals: 2, label: true, expected: '1 MB' },
            { bytes: 1289748.48, decimals: 2, label: true, expected: '1.23 MB' },
            { bytes: 1294467.072, decimals: 4, label: true, expected: '1.2345 MB' },
            { bytes: 1073741824, decimals: 2, label: true, expected: '1 GB' },
            { bytes: 1320702443.52, decimals: 2, label: true, expected: '1.23 GB' },
            { bytes: 1099511627776, decimals: 2, label: true, expected: '1 TB' }
        ]

        for (const value of expectedValues) {
            it(`should show string: ${value.expected} for ${value.bytes} Bytes, Deciamls:${value.decimals}, Label:${value.label}`, () => {
                expect(formatBytes(value.bytes, value.decimals, value.label)).to.equal(value.expected)
            })
        }
    })
})
