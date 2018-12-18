import { expect } from 'chai'
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

        expectedValues.forEach(({ questionPosition, expects }, index) => {
            it(`should have class:.${expects} for position:${questionPosition} `, () => {
                const wrapper = shallowMount(UserInput, {
                    propsData: {
                        question,
                        questionPosition,
                        correctCallback: () => {}
                    }
                })

                expect(wrapper.classes(expects)).to.be.true
            })
        })
    })
    it('should change the v-model correctly', () => {
        let wrapper = mount({
            data() { return { answer: '' } },
            template: `<div> <user-input :question="'question'" v-model="answer"></user-input> </div>`,
            components: { 'user-input': UserInput }
        })

        const expectedAnswer = 'lorem'
        let userInputField = wrapper.find('.user-input__container__input > input')
        userInputField.setValue(expectedAnswer)
        expect(wrapper.vm.$data.answer).to.eq(expectedAnswer)
    })
})
