import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import { spy } from 'sinon'
import SimpleLink from './SimpleLink.vue'

describe('SimpleLink.vue', () => {
    let wrapper = {}
    const expectedUrl = 'https://loremURL'
    const openExternal = spy()

    beforeEach(() => {
        SimpleLink.__Rewire__('shell', { openExternal })
        wrapper = shallowMount(SimpleLink, {
            propsData: {
                href: expectedUrl
            }
        })
    })

    it('should create class "contentelement-link"', () => {
        expect(wrapper).to.have.classes('contentelement-link')
    })

    it('should create a tag', () => {
        expect(wrapper).to.contain('a')
    })

    it('should call openExternal with external URL on click event', () => {
        wrapper.trigger('click')

        expect(openExternal).to.have.been.calledWith(expectedUrl)
    })

    it('should call $router.push with internal URL on click event', () => {
        const expectedUrl = '/settings'
        const push = spy()
        const $router = {
            push
        }
        wrapper = shallowMount(SimpleLink, {
            propsData: {
                href: expectedUrl
            },
            mocks: {
                $router
            }
        })

        wrapper.trigger('click')

        expect(push).to.have.been.calledWith(expectedUrl)
    })
    SimpleLink.__ResetDependency__('shell')
})
