import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { spy } from 'sinon'
import SimpleLink from './SimpleLink.vue'

describe('SimpleLink.vue', () => {
    let wrapper = {}
    const expectedUrl = 'loremURL'
    const openExternal = spy()

    beforeEach(() => {
        SimpleLink.__Rewire__('shell', { openExternal })
        wrapper = shallowMount(SimpleLink, {
            context: {
                props: {
                    url: expectedUrl
                }
            }
        })
    })

    it('class contentelement-link should be added', () => {
        expect(wrapper.classes('contentelement-link')).to.be.true
    })

    it('a tag should be created', () => {
        expect(wrapper.contains('a')).to.be.true
    })

    it('openExternal should be called with URL on click event', () => {
        wrapper.trigger('click')
        expect(openExternal.calledWith(expectedUrl)).to.be.true
    })
})
