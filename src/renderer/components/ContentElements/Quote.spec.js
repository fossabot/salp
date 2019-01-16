import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Quote from './Quote.vue'

describe('Quote.vue', () => {
    let wrapper = {}

    beforeEach(() => {
        wrapper = mount(Quote)
    })

    it('should create class "contentelement-quote"', () => {
        expect(wrapper).to.have.classes('contentelement-quote')
    })

    it('should not have cite when no source slot provided', () => {
        expect(wrapper).not.to.find('cite')
    })

    it('should render default/quote slot')
    it('should render source slot')
})
