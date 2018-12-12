import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import SimpleLink from './SimpleLink.vue'
import SimpleText from './SimpleText.vue'
import Citation from './Citation.vue'

describe('Citation.vue', () => {
    let wrapper = {}
    const expectedCitation = 'dolor sit amet'
    const expectedSource = 'testurl'

    beforeEach(() => {
        wrapper = mount(Citation, {
            context: {
                props: {
                    cite: expectedCitation,
                    source: expectedSource
                }
            }
        })
    })

    it('should contain class contentelement-cite', () => {
        expect(wrapper.classes('contentelement-cite')).to.be.true
    })

    it('should contain simpleText component', () => {
        expect(wrapper.find(SimpleText).exists()).to.be.true
    })

    it('should contain simpleLink component', () => {
        expect(wrapper.find(SimpleLink).exists()).to.be.true
    })
})
