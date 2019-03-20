import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SectionHeader from './SectionHeader.vue'

describe('SectionHeader.vue', () => {
    it('should render content in h3', () => {
        const expectedContent = 'Some test title'

        const wrapper = shallowMount(SectionHeader, {
            slots: {
                default: expectedContent
            }
        })

        expect(wrapper).to.have.name('h3')
        expect(wrapper).to.have.text(expectedContent)
    })

    describe('passes through classes', () => {
        const expectedClass = 'my-element'

        it('should renders static classes', () => {
            const wrapper = shallowMount(SectionHeader, {
                context: {
                    staticClass: expectedClass
                }
            })

            expect(wrapper).to.have.classes(expectedClass)
        })

        it('should renders classes', () => {
            const wrapper = shallowMount(SectionHeader, {
                context: {
                    class: expectedClass
                }
            })

            expect(wrapper).to.have.classes(expectedClass)
        })

        it('should merge dynamic and static classes', () => {
            const expectedDynamicClass = 'some-element__container'
            expect(expectedDynamicClass).to.not.equal(expectedClass)

            const wrapper = shallowMount(SectionHeader, {
                context: {
                    staticClass: expectedClass,
                    class: expectedDynamicClass
                }
            })

            expect(wrapper).to.have.classes(expectedClass)
            expect(wrapper).to.have.classes(expectedDynamicClass)
        })
    })
})
