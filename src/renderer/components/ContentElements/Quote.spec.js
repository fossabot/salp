import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Quote from './Quote.vue'

describe('Quote.vue', () => {
    let wrapper = {}

    beforeEach(() => {
        wrapper = mount(Quote)
    })

    it('should create class "contentelement-quote"', () => {
        expect(wrapper.classes('contentelement-quote')).to.be.true
    })

    it('should not have cite when no source slot provided', () => {
        expect(wrapper.find('cite').exists()).to.be.false
    })

    it('should render default/quote slot')
    it('should render source slot')
})
