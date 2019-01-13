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

    it('should create class "contentelement-link"', () => {
        expect(wrapper).to.have.classes('contentelement-link')
    })

    it('should create a tag', () => {
        expect(wrapper).to.contain('a')
    })

    it('should call openExternal with expected URL on click event', () => {
        wrapper.trigger('click')

        expect(openExternal).to.have.been.calledWith(expectedUrl)
    })
    SimpleLink.__ResetDependency__('shell')
})
