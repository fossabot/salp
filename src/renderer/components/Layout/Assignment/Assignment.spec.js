import { expect } from 'chai'
import { shallowMount, mount } from '@vue/assignment-utils'
import Assignment from './Assignment.vue'
import { spy } from 'sinon'

describe('Assignment.vue', () => {
    const questions = [
        {
            component: 'MultipleChoice',
            question: 'What does the fox say?',
            answers: [
                { answer: 'Hacki Hacki Hacki Ho', correct: false },
                { answer: 'GubelGubel', correct: false },
                { answer: 'LabelLabel', correct: true }
            ],
            $correct: true
        },
        {
            component: 'SingleChoice',
            question: 'Chicken or Egg?',
            answers: [
                { answer: 'Hacki Hacki Hacki Ho', correct: false },
                { answer: 'Egg', correct: true },
                { answer: 'Chicken', correct: false }
            ],
            $correct: true
        },
        {
            component: 'SingleChoice',
            question: 'Chicken or Egg?',
            answers: [
                { answer: 'Hacki Hacki Hacki Ho', correct: false },
                { answer: 'Egg', correct: true },
                { answer: 'Chicken', correct: false }
            ],
            $correct: true
        },
        {
            component: 'SingleChoice',
            question: 'Chicken or Egg?',
            answers: [
                { answer: 'Hacki Hacki Hacki Ho', correct: false },
                { answer: 'Egg', correct: true },
                { answer: 'Chicken', correct: false }
            ],
            $correct: false
        }
    ]

    const expectedValues = [
        { passedAt: 0.5, expects: true },
        { passedAt: 0.75, expects: true },
        { passedAt: 1, expects: false }
    ]

    expectedValues.forEach(({ passedAt, expects }) => {
        it(`should evaluate the assignment is passed to:${expects} for passedAt:${passedAt}`, () => {
            const wrapper = shallowMount(Assignment, {})

            wrapper.setData({
                questions,
                passedAt
            })

            const passed = wrapper.vm.passed
            expect(passed).to.equal(expects)
        })
    })

    describe('Assignment check button', () => {
        it('should handle question validation if button is pressed once', () => {
            const wrapper = mount(Assignment, {})

            let handleQuestionValidated = spy()

            wrapper.setData({
                questions
            })

            wrapper.setMethods({
                handleQuestionValidated
            })

            wrapper.find('.assignment-content__button-container__button').trigger('click')
            expect(handleQuestionValidated.calledOnce).to.be.true
        })

        it('should show next question if button is presst the second time', () => {
            const wrapper = mount(Assignment, {})

            wrapper.setData({
                questions
            })

            wrapper.find('.assignment-content__button-container__button').trigger('click')
            wrapper.find('.assignment-content__button-container__button').trigger('click')
            expect(wrapper.vm.$data.currentQuestion).to.equal(1)
        })

        it('should check if the assignment is passed if the button is presst at the last question', () => {
            let passed = spy()
            const wrapper = mount(Assignment, {
                computed: {
                    passed
                }
            })

            wrapper.setData({
                questions
            })

            questions.forEach(question => {
                wrapper.find('.assignment-content__button-container__button').trigger('click')
                wrapper.find('.assignment-content__button-container__button').trigger('click')
            })
            expect(passed.calledOnce).to.be.true
        })
    })
})
