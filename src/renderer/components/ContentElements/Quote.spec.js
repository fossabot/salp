import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import SimpleText from './SimpleText.vue'
import Quote from './Quote.vue'

const localVue = createLocalVue()
localVue.component(SimpleText.name, SimpleText)

describe('Quote.vue', () => {
    let wrapper = {}
    const expectedQuote = 'dolor sit amet'

    beforeEach(() => {
        wrapper = mount(Quote, {
            localVue,
            context: {
                props: {
                    quote: expectedQuote
                }
            }
        })
    })

    it('should create class "contentelement-quote"', () => {
        expect(wrapper.classes('contentelement-quote')).to.be.true
    })

    it('should create simple-text component', () => {
        expect(wrapper.find(SimpleText).exists()).to.be.true
    })

    it('should not have cite when no source slot provided', () => {
        expect(wrapper.find('cite').exists()).to.be.false
    })

    it('should render source slot')
})
