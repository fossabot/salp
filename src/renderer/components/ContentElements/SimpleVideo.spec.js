import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SimpleVideo from './SimpleVideo.vue'

describe('SimpleVideo.vue', () => {
    let wrapper = {}
    const expectedSrc = 'path/to/video/file'

    beforeEach(() => {
        wrapper = shallowMount(SimpleVideo, {
            context: {
                props: {
                    src: expectedSrc
                }
            }
        })
    })

    it('should create class "contentelement-video"', () => {
        expect(wrapper.classes('contentelement-video')).to.be.true
    })

    it('should enable control elements of the video', () => {
        expect(wrapper.attributes().controls).to.exist
    })

    it('should create video tag', () => {
        expect(wrapper.contains('video')).to.be.true
    })

    it('should create source tag', () => {
        expect(wrapper.contains('source')).to.be.true
    })

    it('should set src attribute correctly', () => {
        expect(wrapper.find('source').attributes('src')).to.equal(expectedSrc)
    })
})
