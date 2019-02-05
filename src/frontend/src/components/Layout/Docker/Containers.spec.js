import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { namespace, types } from '@/store/modules/AppState.js'
import Containers from './Containers.vue'
import { stub } from 'sinon'
import { Table } from 'element-ui'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Containers.vue', () => {
    const expectedImage = 'lorem'
    const expectedState = 'running'
    const expectedPort = ['23342']
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
            getters
        })

        wrapper = mount(Containers, {
            store,
            localVue,
            propsData: {
                containers,
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
})
