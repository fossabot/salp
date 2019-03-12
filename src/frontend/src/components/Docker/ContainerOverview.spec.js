import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { namespace, types } from '@/store/modules/AppState.js'
import { namespace as userPreferencesNamespace, types as userPreferencesTypes } from '@/store/modules/persisted/UserPreferences.js'
import ContainerOverview from './ContainerOverview.vue'
import { stub, spy } from 'sinon'
import { Table } from 'element-ui'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ContainerOverview.vue', () => {
    const expectedContainerName = 'salp_lorem_ipsum'
    const expectedContainerState = 'running'
    const expectedContainerPort = ['23342']
    const expectedBaseIp = '127.0.0.1'

    let wrapper
    let allContainers
    let containerStatus
    let containerPorts
    let baseIp
    let send
    let getters
    let store

    beforeEach(() => {
        allContainers = stub().callsFake(() => ({ [expectedContainerName]: {} }))
        containerStatus = stub().callsFake(() => expectedContainerState)
        containerPorts = stub().callsFake(() => expectedContainerPort)
        baseIp = stub().callsFake(() => expectedBaseIp)

        getters = {
            [`${namespace}/${types.GET_ALL_CONTAINERS}`]: allContainers,
            [`${namespace}/${types.GET_CONTAINER_STATUS}`]: (state) => containerStatus,
            [`${namespace}/${types.GET_CONTAINER_PORTS_SIMPLE}`]: (state) => containerPorts,
            [`${userPreferencesNamespace}/${userPreferencesTypes.GET}`]: (state) => baseIp
        }

        store = new Vuex.Store({
            getters
        })

        send = spy()

        ContainerOverview.__Rewire__('ipcRenderer', { send })

        wrapper = mount(ContainerOverview, { store, localVue })
    })

    it('should generate tableData', () => {
        expect(allContainers).to.have.been.calledOnce
        expect(containerStatus).to.have.been.calledOnce
        expect(containerPorts).to.have.been.calledOnce

        const splitedName = expectedContainerName.split('_')
        const expectedTableData = [{
            'fullname': expectedContainerName,
            'course': splitedName[1],
            'image': splitedName[2],
            'status': expectedContainerState,
            'ports': expectedContainerPort
        }]
        const tableData = wrapper.vm.tableData
        expect(tableData).to.deep.equal(expectedTableData)
    })

    it('should render table', () => {
        expect(wrapper.find(Table).exists()).to.be.true
    })

    it('should call ipcRenderer send', () => {
        expect(send).to.have.been.calledOnce
        expect(send).to.have.been.calledWith('docker:getAllContainers')
    })
})
