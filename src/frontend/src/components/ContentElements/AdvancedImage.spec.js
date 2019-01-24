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
    const expectedSrc = '$root/__mocks__/images/lorem.jpg'
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

    it('should create class "el-card"', () => {
        expect(wrapper).to.contains('.el-card')
    })

    it('should create SimpleImage component', () => {
        expect(wrapper).to.contains(SimpleImage)
    })

    it('should create SimpleText component', () => {
        expect(wrapper).to.contains(SimpleText)
    })
})
