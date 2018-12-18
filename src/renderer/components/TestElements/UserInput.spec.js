import { expect } from 'chai'
import { stub } from 'sinon'
import { shallowMount, mount } from '@vue/test-utils'
import UserInput from './UserInput.vue'

describe('UserInput.vue', () => {
    const question = 'Lorem ipsum dollor sit atmet?'

    describe('Test positioning of the question', () => {
        const expectedValues = [
            { questionPosition: 'top', expects: 'top' },
            { questionPosition: 'Top', expects: 'top' },
            { questionPosition: 'left', expects: 'left' },
            { questionPosition: 'Left', expects: 'left' }
        ]

        expectedValues.forEach(({ questionPosition, expects }) => {
            it(`should have class:.${expects} for position:${questionPosition} `, () => {
                const wrapper = shallowMount(UserInput, {
                    propsData: {
                        question,
                        questionPosition,
                        correctCallback: stub()
                    }
                })

                expect(wrapper.classes(expects)).to.be.true
            })
        })
    })

    it('should change the v-model correctly', () => {
        const expectedAnswer = 'lorem'

        let wrapper = mount({
            data() {
                return {
                    answer: ''
                }
            },
            template: `<div><UserInput question="question" v-model="answer"/></div>`,
            components: {
                UserInput
            }
        })

        const userInputField = wrapper.find('.user-input__container__input > input')
        userInputField.setValue(expectedAnswer)
        expect(wrapper.vm.$data.answer).to.equal(expectedAnswer)
    })
})
