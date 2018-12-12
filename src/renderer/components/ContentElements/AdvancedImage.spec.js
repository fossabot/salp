import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import AdvancedImage from './AdvancedImage.vue'
import SimpleImage from './SimpleImage.vue'
import SimpleText from './SimpleText.vue'

describe('AdvancedImage.vue', () => {
    let wrapper = {}
    const expectedSrc = '@/__mocks__/images/lorem.jpg'
    const expectedDesc = 'lorem ipsum dollor sit atmet'

    beforeEach(() => {
        wrapper = mount(AdvancedImage, {
            context: {
                props: {
                    src: expectedSrc,
                    description: expectedDesc
                }
            }
        })
    })

    it('card should be created', () => {
        expect(wrapper.contains('.el-card')).to.be.true
    })

    it('simpleImage should be created', () => {
        expect(wrapper.contains(SimpleImage)).to.be.true
    })

    it('simpleText should be created', () => {
        expect(wrapper.contains(SimpleText)).to.be.true
    })
})
