import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import SingleChoiceRadiobutton from './SingleChoiceRadiobutton.vue'

describe('SingleChoiceRadiobutton.vue', () => {
    const assignmentName = 'lorem'
    const expectedValues = [
        { isValid: true, expects: 'is-valid' },
        { isValid: false, expects: 'is-invalid' },
        { isValid: undefined, expects: 'is-validUnchecked' }
    ]
    const answer = 'Lorem ipsum dollor sit atmet?'

    expectedValues.forEach(({ isValid, expects }, index) => {
        it(`should evaluate isValid:${isValid} , to the class ${expects}`, () => {
            const wrapper = shallowMount(SingleChoiceRadiobutton, {
                propsData: {
                    answer,
                    isValid,
                    assignmentName,
                    retry: true,
                    question: 'lorem'
                }
            })

            const getValidationClass = wrapper.vm.getValidationClass
            expect(getValidationClass).to.equal(expects)
        })
    })
})
