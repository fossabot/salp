import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { namespace, types } from '@/store/modules/AppState.js'
import DockerControls from './DockerControls.vue'
import { stub, spy } from 'sinon'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('DockerControls.vue', () => {
    const expectedImage = 'lorem'
    const expectedIsBlocking = false

    const images = {
        [expectedImage]: {}
    }

    const course = {
        name: 'Lorem Ipsum',
        images
    }

    let expectedContainerUpCount = Object.keys(images).length
    let wrapper
    let containerUpCount
    let containerIsBlocking
    let getters
    let store
    let send

    describe('Computed', () => {
        beforeEach(() => {
            containerUpCount = stub().callsFake(() => expectedContainerUpCount)
            containerIsBlocking = stub().callsFake(() => expectedIsBlocking)

            getters = {
                [`${namespace}/${types.GET_CONTAINER_UP_COUNT}`]: (state) => containerUpCount,
                [`${namespace}/${types.GET_CONTAINER_STATUS_IS_BLOCKING}`]: (state) => containerIsBlocking
            }

            store = new Vuex.Store({
                getters
            })

            wrapper = shallowMount(DockerControls, {
                store,
                localVue,
                propsData: {
                    name: course.name,
                    images: course.images
                },
                stubs: ['router-link']
            })
        })

        it('should return correct containers count', () => {
            const expectedContainerCount = Object.keys(images).length
            const contaienrCount = wrapper.vm.containersCount
            expect(contaienrCount).to.equal(expectedContainerCount)
        })

        it('should return the correct courseName', () => {
            const expectedCourseName = course.name.trim().replace(/\s/g, '').toLowerCase()
            const courseName = wrapper.vm.courseName
            expect(courseName).to.equal(expectedCourseName)
        })
    })

    describe('all containers are running', () => {
        beforeEach(() => {
            containerUpCount = stub().callsFake(() => expectedContainerUpCount)
            containerIsBlocking = stub().callsFake(() => expectedIsBlocking)
            send = spy()

            getters = {
                [`${namespace}/${types.GET_CONTAINER_UP_COUNT}`]: (state) => containerUpCount,
                [`${namespace}/${types.GET_CONTAINER_STATUS_IS_BLOCKING}`]: (state) => containerIsBlocking
            }

            store = new Vuex.Store({
                getters
            })

            DockerControls.__Rewire__('ipcRenderer', { send })

            wrapper = shallowMount(DockerControls, {
                store,
                localVue,
                propsData: {
                    name: course.name,
                    images: course.images
                },
                stubs: ['router-link']
            })
        })

        it('should validate that all containers are running', () => {
            const allContainersUp = wrapper.vm.allContainersUp
            expect(allContainersUp).to.be.true
        })

        it('should show stop if all containers are up', () => {
            const buttonText = wrapper.vm.buttonText
            expect(buttonText).to.equal('Stop')
        })
    })

    describe('not all containers are running', () => {
        beforeEach(() => {
            expectedContainerUpCount = 0
            containerUpCount = stub().callsFake(() => expectedContainerUpCount)
            containerIsBlocking = stub().callsFake(() => expectedIsBlocking)

            getters = {
                [`${namespace}/${types.GET_CONTAINER_UP_COUNT}`]: (state) => containerUpCount,
                [`${namespace}/${types.GET_CONTAINER_STATUS_IS_BLOCKING}`]: (state) => containerIsBlocking
            }

            store = new Vuex.Store({
                getters
            })

            DockerControls.__Rewire__('ipcRenderer', { send })

            wrapper = shallowMount(DockerControls, {
                store,
                localVue,
                propsData: {
                    name: course.name,
                    images: course.images
                },
                stubs: ['router-link']
            })
        })

        it('should validate that not all containers are running', () => {
            const allContainersUp = wrapper.vm.allContainersUp
            expect(allContainersUp).to.be.false
        })

        it('should show start if not all containers are up', () => {
            const buttonText = wrapper.vm.buttonText
            expect(buttonText).to.equal('Start')
        })
    })
})
