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

    it('should create class "contentelement-image"', () => {
        expect(wrapper.classes('contentelement-image')).to.be.true
    })

    it('should create img tag', () => {
        expect(wrapper.contains('img')).to.be.true
    })

    it('should set src attribute correctly', () => {
        expect(wrapper.attributes('src')).to.equal(expectedSrc)
    })
})
