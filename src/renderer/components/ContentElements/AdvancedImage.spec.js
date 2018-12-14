import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import AdvancedImage from './AdvancedImage.vue'
import SimpleImage from './SimpleImage.vue'
import SimpleText from './SimpleText.vue'
import { Card } from 'element-ui'

const localVue = createLocalVue()
localVue.component(SimpleImage.name, SimpleImage)
localVue.component(SimpleText.name, SimpleText)
localVue.component('Card', Card)

describe('AdvancedImage.vue', () => {
    let wrapper = {}
    const expectedSrc = '@/__mocks__/images/lorem.jpg'
    const expectedDesc = 'lorem ipsum dollor sit atmet'

    beforeEach(() => {
        wrapper = mount(AdvancedImage, {
            localVue,
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
