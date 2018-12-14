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
        expect(wrapper.classes('contentelement-text')).to.be.true
    })

    it('should create p tag', () => {
        expect(wrapper.contains('p')).to.be.true
    })

    it('should set text correctly', () => {
        expect(wrapper.text()).to.equal(expectedText)
    })
})
