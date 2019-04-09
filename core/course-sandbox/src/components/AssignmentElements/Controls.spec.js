import { expect } from 'chai'
import { shallowMount, mount } from '@vue/test-utils'
import Controls from './Controls.vue'

describe('Controls.vue', () => {
    let sandbox = require('sinon').createSandbox()
    const matomoStub = {
        trackEvent: sandbox.stub()
    }
    const translateStub = sandbox.stub()

    afterEach(() => {
        sandbox.reset()
    })

    after(() => {
        sandbox.restore()
    })

    it('should emit buttonClick on click', () => {
        const wrapper = mount(Controls, {
            propsData: {
                assignmentName: 'lorem',
                assignmentState: 'ANSWERING'
            },
            mocks: {
                $t: translateStub,
                $matomo: matomoStub
            }
        })

        wrapper.find('.assignment-content__button-container__button').trigger('click')
        expect(wrapper).to.have.emitted('buttonClick')
    })

    describe('should set the correct button text', () => {
        const expectedValues = [
            { state: 'NOT_STARTED', expected: 'Assignment.button.start' },
            { state: 'FINISHED', expected: 'Assignment.button.result' },
            { state: 'NEXT_QUESTION', expected: 'Assignment.button.next' },
            { state: 'ANSWERING', expected: 'Assignment.button.check' },
            { state: 'ANSWERING_RETRY', expected: 'Assignment.button.retry' }
        ]

        expectedValues.forEach(({ state, expected }) => {
            it(`should translate ${expected} for ${state}`, () => {
                shallowMount(Controls, {
                    propsData: {
                        assignmentName: 'lorem',
                        assignmentState: state
                    },
                    mocks: {
                        $t: translateStub
                    }
                })

                expect(translateStub).to.have.been.calledWith(expected)
            })
        })
    })
})
