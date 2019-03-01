import { expect } from 'chai'
import { shallowMount, mount } from '@vue/test-utils'
import Assignment from './Assignment.vue'
import { spy, stub } from 'sinon'

describe('Assignment.vue', () => {
    const matomoStub = {
        trackEvent: stub()
    }

    const name = 'loremIpsum'
    const passedAt = 0.5

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
            const wrapper = shallowMount(Assignment, {
                propsData: {
                    name,
                    passedAt,
                    questions
                }
            })

            const passed = wrapper.vm.passed
            expect(passed).to.equal(expects)
        })
    })

    describe('Assignment check button', () => {
        it('should handle question validation if button is pressed once', () => {
            const wrapper = mount(Assignment, {
                propsData: {
                    name,
                    passedAt,
                    questions
                },
                mocks: {
                    $matomo: matomoStub
                }
            })

            let handleQuestionValidated = spy()

            wrapper.setMethods({
                handleQuestionValidated
            })

            wrapper.find('.assignment-content__start-button').trigger('click')

            wrapper.find('.assignment-content__button-container__button').trigger('click')
            expect(handleQuestionValidated.calledOnce).to.be.true
        })

        it('should allow multiple tries for validation, if in retry mode ', () => {
            const questionsRetry = [
                {
                    component: 'MultipleChoice',
                    question: 'What does the fox say?',
                    answers: [
                        { answer: 'Hacki Hacki Hacki Ho', correct: false },
                        { answer: 'GubelGubel', correct: false },
                        { answer: 'LabelLabel', correct: true }
                    ]
                },
                {
                    component: 'SingleChoice',
                    question: 'Chicken or Egg?',
                    answers: [
                        { answer: 'Hacki Hacki Hacki Ho', correct: false },
                        { answer: 'Egg', correct: true },
                        { answer: 'Chicken', correct: false }
                    ]
                }
            ]

            const wrapper = mount(Assignment, {
                propsData: {
                    name,
                    passedAt,
                    questions: questionsRetry
                },
                mocks: {
                    $matomo: matomoStub
                }
            })
            let handleQuestionValidated = spy()

            wrapper.setMethods({
                handleQuestionValidated
            })

            wrapper.find('.assignment-content__start-button').trigger('click')

            wrapper.findAll('label').at(0).trigger('click')
            wrapper.find('.assignment-content__button-container__button').trigger('click')
            wrapper.findAll('label').at(1).trigger('click')
            wrapper.find('.assignment-content__button-container__button').trigger('click')
            expect(handleQuestionValidated.calledTwice).to.be.true
        })

        it('should show next question if button is presst the second time and no retry', () => {
            const wrapper = mount(Assignment, {
                propsData: {
                    retry: false,
                    name,
                    passedAt,
                    questions
                },
                mocks: {
                    $matomo: matomoStub
                }
            })

            wrapper.find('.assignment-content__start-button').trigger('click')

            wrapper.find('.assignment-content__button-container__button').trigger('click')
            wrapper.find('.assignment-content__button-container__button').trigger('click')
            expect(wrapper.vm.$data.currentQuestionIndex).to.equal(1)
        })

        it('should check if the assignment is passed if the button is presst at the last question', () => {
            let passed = spy()
            const wrapper = mount(Assignment, {
                propsData: {
                    retry: false,
                    name,
                    passedAt,
                    questions
                },
                computed: {
                    passed
                },
                mocks: {
                    $matomo: matomoStub
                }
            })

            wrapper.find('.assignment-content__start-button').trigger('click')

            questions.forEach(question => {
                wrapper.find('.assignment-content__button-container__button').trigger('click')
                wrapper.find('.assignment-content__button-container__button').trigger('click')
            })
            expect(passed.calledOnce).to.be.true
        })
    })
})