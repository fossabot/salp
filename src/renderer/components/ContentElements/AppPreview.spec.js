import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import AppPreview from './AppPreview.vue'
import SimpleLink from './SimpleLink.vue'
import SimpleImage from './SimpleImage.vue'
import SimpleText from './SimpleText.vue'
import Heading from './Heading.vue'

describe('AppPreview.vue', () => {
    let wrapper = {}
    const expectedImageSrc = 'path/to/image/file'
    const expectedHeading = 'Lorem Ipsum'
    const expectedDescription = 'dolor sit amet'
    const expectedUrl = 'testurl'

    beforeEach(() => {
        wrapper = shallowMount(AppPreview, {
            context: {
                props: {
                    src: expectedImageSrc,
                    heading: expectedHeading,
                    description: expectedDescription,
                    url: expectedUrl
                }
            }
        })
    })

    it('class contentelement-app-preview should be added', () => {
        expect(wrapper.classes('contentelement-app-preview')).to.be.true
    })

    it('simpleImage component should be created', () => {
        expect(wrapper.find(SimpleImage).exists()).to.be.true
    })

    it('heading component should be created', () => {
        expect(wrapper.find(Heading).exists()).to.be.true
    })

    it('simpleText component should be created', () => {
        expect(wrapper.find(SimpleText).exists()).to.be.true
    })

    it('simpleLink component should be created', () => {
        expect(wrapper.find(SimpleLink).exists()).to.be.true
    })
})
