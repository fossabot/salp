import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Hints from './Hints.vue'

describe('Hints.vue', () => {
    let sandbox = require('sinon').createSandbox()
    const matomoStub = {
        trackEvent: sandbox.stub()
    }

    afterEach(() => {
        sandbox.reset()
    })

    after(() => {
        sandbox.restore()
    })

    const assignmentName = 'lorem'
    const hints = [
        'lorem',
        'ipsum',
        'dollor',
        'sit',
        'atmet'
    ]

    it('should handle button click to show hints', () => {
        const wrapper = mount(Hints, {
            propsData: {
                hints,
                assignmentName,
                retries: 0
            },
            mocks: {
                $matomo: matomoStub
            }
        })

        expect(wrapper.vm.showHints).to.be.false

        const handleButtonClick = wrapper.vm.handleButtonClick
        handleButtonClick()

        expect(wrapper.vm.showHints).to.be.true
        expect(wrapper).to.have.emitted('hintEvent')
    })

    it('should process hints', () => {
        const hints = [
            'lorem',
            'ipsum',
            'dollor'
        ]
        const expectedLength = hints.slice().length + 1

        const wrapper = mount(Hints, {
            propsData: {
                hints,
                assignmentName,
                retries: 0
            },
            mocks: {
                $matomo: matomoStub
            }
        })

        const getMaxHints = wrapper.vm.getMaxHints
        expect(getMaxHints).to.equal(expectedLength)
    })
})
