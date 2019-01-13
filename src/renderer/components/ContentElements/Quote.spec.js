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
        expect(wrapper).to.have.classes('contentelement-quote')
    })

    it('should create SimpleText component', () => {
        expect(wrapper).to.find(SimpleText)
    })

    it('should not have cite when no source slot provided', () => {
        // see https://github.com/jdoubleu/vue-test-chai/issues/1
        expect(wrapper.find('cite')).not.to.exist
    })

    it('should render source slot')
})
