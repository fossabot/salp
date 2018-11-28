import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SectionHeader from './SectionHeader.vue'

describe('SectionHeader.vue', () => {
    it('renders content in h3', () => {
        const expectedContent = 'Some test title'

        const wrapper = shallowMount(SectionHeader, {
            slots: {
                default: expectedContent
            }
        })

        expect(wrapper.name()).to.equal('h3')
        expect(wrapper.text()).to.equal(expectedContent)
    })

    describe('passes through classes', () => {
        const expectedClass = 'my-element'

        it('renders static classes', () => {
            const wrapper = shallowMount(SectionHeader, {
                context: {
                    staticClass: expectedClass
                }
            })
    
            expect(wrapper.classes(expectedClass)).to.be.true
        })

        it('renders classes', () => {
            const wrapper = shallowMount(SectionHeader, {
                context: {
                    class: expectedClass
                }
            })
    
            expect(wrapper.classes(expectedClass)).to.be.true
        })

        it('merges dynamic and static classes', () => {
            const expectedDynamicClass = 'some-element__container'
            expect(expectedDynamicClass).to.not.equal(expectedClass)

            const wrapper = shallowMount(SectionHeader, {
                context: {
                    staticClass: expectedClass,
                    class: expectedDynamicClass
                }
            })

            expect(wrapper.classes(expectedClass)).to.be.true
            expect(wrapper.classes(expectedDynamicClass)).to.be.true
        })
    })
})
