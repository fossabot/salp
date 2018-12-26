import { expect } from 'chai'
import { shallowMount, mount } from '@vue/test-utils'
import Test from './Test.vue'
import { spy } from 'sinon'

describe('Test.vue', () => {
    const questions = [
        {
            component: 'MultipleChoice',
            question: 'What does the fox say?',
            answers: [
                { answer: 'Hacki Hacki Hacki Ho', correct: false },
                { answer: 'GubelGubel', correct: false },
                { answer: 'LabelLabel', correct: true }
            ],
            answer: true
        },
        {
            component: 'SingleChoice',
            question: 'Chicken or Egg?',
            answers: [
                { answer: 'Hacki Hacki Hacki Ho', correct: false },
                { answer: 'Egg', correct: true },
                { answer: 'Chicken', correct: false }
            ],
            answer: true
        },
        {
            component: 'SingleChoice',
            question: 'Chicken or Egg?',
            answers: [
                { answer: 'Hacki Hacki Hacki Ho', correct: false },
                { answer: 'Egg', correct: true },
                { answer: 'Chicken', correct: false }
            ],
            answer: true
        },
        {
            component: 'SingleChoice',
            question: 'Chicken or Egg?',
            answers: [
                { answer: 'Hacki Hacki Hacki Ho', correct: false },
                { answer: 'Egg', correct: true },
                { answer: 'Chicken', correct: false }
            ],
            answer: false
        }
    ]

    const expectedValues = [
        { passedAt: 0.5, expects: true },
        { passedAt: 0.75, expects: true },
        { passedAt: 1, expects: false }
    ]

    expectedValues.forEach(({ passedAt, expects }) => {
        it(`should evaluate the test is passed to:${expects} for passedAt:${passedAt}`, () => {
            const wrapper = shallowMount(Test, {})

            wrapper.setData({
                questions,
                passedAt
            })

            const passed = wrapper.vm.passed
            expect(passed).to.equal(expects)
        })
    })

    describe('Test check button', () => {
        it('should show next question if button is presst', () => {
            const wrapper = mount(Test, {})

            wrapper.setData({
                questions
            })

            wrapper.find('.test-content__container__button-container__button').trigger('click')
            expect(wrapper.vm.$data.currentQuestion).to.equal(1)
        })

        it('should check if the test is passed if the button is presst at the last question', () => {
            let passed = spy()
            const wrapper = mount(Test, {
                computed: {
                    passed
                }
            })

            wrapper.setData({
                questions
            })

            questions.forEach(question => {
                wrapper.find('.test-content__container__button-container__button').trigger('click')
            })
            expect(passed.calledOnce).to.be.true
        })
    })
})
