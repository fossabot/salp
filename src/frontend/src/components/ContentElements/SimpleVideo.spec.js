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
        expect(wrapper).to.have.classes('contentelement-video')
    })

    it('should enable control elements of the video', () => {
        expect(wrapper).to.have.attributes('controls')
    })

    it('should create video tag', () => {
        expect(wrapper).to.contain('video')
    })

    it('should create source tag', () => {
        expect(wrapper).to.contain('source')
    })

    it('should set src attribute correctly', () => {
        expect(wrapper).to.find('source').which.has.attributes('src', expectedSrc)
    })
})
