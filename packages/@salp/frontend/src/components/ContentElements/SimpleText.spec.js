import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SimpleText from './SimpleText.vue'

describe('SimpleText.vue', () => {
    let wrapper = {}
    const expectedText = 'Hello World'

    beforeEach(() => {
        wrapper = shallowMount(SimpleText, {
            context: {
                children: [expectedText]
            }
        })
    })

    it('should create class "contentelement-text"', () => {
        expect(wrapper).to.have.classes('contentelement-text')
    })

    it('should create p tag', () => {
        expect(wrapper).to.contain('p')
    })

    it('should set text correctly', () => {
        expect(wrapper).to.have.text(expectedText)
    })
})
