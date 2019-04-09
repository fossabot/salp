import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { spy } from 'sinon'
import SimpleLink from './SimpleLink.vue'

describe('SimpleLink.vue', () => {
    let wrapper = {}
    const expectedUrl = 'loremURL'
    const openExternalLink = spy()

    beforeEach(() => {
        SimpleLink.__Rewire__('links', { openExternalLink })
        wrapper = shallowMount(SimpleLink, {
            context: {
                props: {
                    href: expectedUrl
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

    it('should call openExternalLink with expected URL on click event', () => {
        wrapper.trigger('click')

        expect(openExternalLink).to.have.been.calledWith(expectedUrl)
    })
    SimpleLink.__ResetDependency__('shell')
})
