import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import AppPreview from './AppPreview.vue'
import SimpleLink from './SimpleLink.vue'
import SimpleImage from './SimpleImage.vue'
import SimpleText from './SimpleText.vue'
import Heading from './Heading.vue'
import { Card } from 'element-ui'

const localVue = createLocalVue()
localVue.component(SimpleLink.name, SimpleLink)
localVue.component(SimpleImage.name, SimpleImage)
localVue.component(SimpleText.name, SimpleText)
localVue.component(Heading.name, Heading)
localVue.component('Card', Card)

describe('AppPreview.vue', () => {
    let wrapper = {}
    const expectedImageSrc = 'path/to/image/file'
    const expectedHeading = 'Lorem Ipsum'
    const expectedDescription = 'dolor sit amet'
    const expectedUrl = 'testurl'

    beforeEach(() => {
        wrapper = mount(AppPreview, {
            localVue,
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

    it('should create class "contentelement-app-preview"', () => {
        expect(wrapper.classes('contentelement-app-preview')).to.be.true
    })

    it('should create SimpleImage component', () => {
        expect(wrapper.find(SimpleImage).exists()).to.be.true
    })

    it('should create Heading component', () => {
        expect(wrapper.find(Heading).exists()).to.be.true
    })

    it('should create SimpleText component', () => {
        expect(wrapper.find(SimpleText).exists()).to.be.true
    })

    it('should create SimpleLink component', () => {
        expect(wrapper.find(SimpleLink).exists()).to.be.true
    })
})
