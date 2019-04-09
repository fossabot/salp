import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import HintCheckbox from './HintCheckbox.vue'

describe('HintCheckbox.vue', () => {
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
    const hint = 'Lorem ipsum dollor'
    const retries = 0

    it('should render hint', () => {
        const wrapper = mount(HintCheckbox, {
            propsData: {
                hint,
                assignmentName,
                retries
            },
            mocks: {
                $matomo: matomoStub
            }
        })

        expect(wrapper.html()).to.include(hint)
    })
})
