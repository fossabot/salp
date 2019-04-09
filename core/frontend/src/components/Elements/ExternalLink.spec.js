import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { stub } from 'sinon'
import ExternalLink from './ExternalLink.vue'

describe('ExternalLink.vue', () => {
    it('should be a functional component', () => {
        expect(ExternalLink).to.have.property('functional', true)
    })

    it('should render a-tag', () => {
        const wrapper = shallowMount(ExternalLink)

        expect(wrapper).to.be.name('a')
    })

    it('should require href prop', () => {
        const hrefProp = ExternalLink.props.href

        expect(hrefProp).to.have.property('required', true)
    })

    it('should render href prop in a-tag href property', () => {
        const expectedHref = 'https://example.com/_some_href_url'
        const wrapper = shallowMount(ExternalLink, {
            context: {
                props: { href: expectedHref }
            }
        })

        expect(wrapper).to.have.attributes('href').which.equals(expectedHref)
    })

    it('should call shell.openExternal with href', () => {
        const expectedHref = 'https://example.com/_other_href_url'
        const openExternalStub = stub()
        ExternalLink.__set__('shell', { openExternal: openExternalStub })

        const wrapper = shallowMount(ExternalLink, {
            context: {
                props: { href: expectedHref }
            }
        })

        wrapper.trigger('click')

        expect(openExternalStub).to.have.been.calledWith(expectedHref)
    })
})
