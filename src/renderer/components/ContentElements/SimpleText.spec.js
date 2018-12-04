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

    it('class contentelement-text should be added', () => {
        expect(wrapper.classes('contentelement-text')).to.be.true
    })

    it('p tag should be created', () => {
        expect(wrapper.contains('p')).to.be.true
    })

    it('text should be set', () => {
        expect(wrapper.text()).to.equal(expectedText)
    })
})
