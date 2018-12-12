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

    it('class contentelement-video should be added', () => {
        expect(wrapper.classes('contentelement-video')).to.be.true
    })

    it('controls should be enabled', () => {
        expect(wrapper.attributes().controls).to.exist
    })

    it('video tag should be created', () => {
        expect(wrapper.contains('video')).to.be.true
    })

    it('source tag should be created', () => {
        expect(wrapper.contains('source')).to.be.true
    })

    it('src should be set', () => {
        expect(wrapper.find('source').attributes('src')).to.equal(expectedSrc)
    })
})
