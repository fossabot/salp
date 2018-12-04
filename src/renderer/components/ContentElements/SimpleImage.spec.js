import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SimpleImage from './SimpleImage.vue'

describe('SimpleImage.vue', () => {
    let wrapper = {}
    const expectedSrc = 'path/to/image/file'

    beforeEach(() => {
        wrapper = shallowMount(SimpleImage, {
            context: {
                props: {
                    src: expectedSrc
                }
            }
        })
    })

    it('class contentelement-image should be added', () => {
        expect(wrapper.classes('contentelement-image')).to.be.true
    })

    it('img tag should be created', () => {
        expect(wrapper.contains('img')).to.be.true
    })

    it('src should be set', () => {
        expect(wrapper.attributes('src')).to.equal(expectedSrc)
    })
})
