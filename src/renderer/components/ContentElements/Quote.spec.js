import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import SimpleLink from './SimpleLink.vue'
import SimpleText from './SimpleText.vue'
import Quote from './Quote.vue'

describe('Quote.vue', () => {
    let wrapper = {}
    const expectedQuote = 'dolor sit amet'
    const expectedSource = 'testurl'

    beforeEach(() => {
        wrapper = mount(Quote, {
            context: {
                props: {
                    quote: expectedQuote
                }
            }
        })
    })

    it('should contain class contentelement-quote', () => {
        expect(wrapper.classes('contentelement-quote')).to.be.true
    })

    it('should contain simpleText component', () => {
        expect(wrapper.find(SimpleText).exists()).to.be.true
    })

    it('should contain simpleLink component', () => {
        expect(wrapper.find(SimpleLink).exists()).to.be.true
    })
})
