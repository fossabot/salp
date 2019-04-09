import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import QuestionRouter from './QuestionRouter.vue'

describe('QuestionRouter.vue', () => {
    let sandbox = require('sinon').createSandbox()
    const matomoStub = {
        trackEvent: sandbox.stub()
    }

    afterEach(() => {
        sandbox.reset()
    })

    after(() => {
        sandbox.restore()
    })

    const questions = [
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
        },
        {
            component: 'SingleChoice',
            question: 'Chicken or Egg?',
            answers: [
                { answer: 'Hacki Hacki Hacki Ho', correct: false },
                { answer: 'Egg', correct: true },
                { answer: 'Chicken', correct: false }
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

    it('should return the current question', () => {
        const wrapper = shallowMount(QuestionRouter, {
            propsData: {
                questions,
                assignmentName: 'lorem',
                assignmentState: 'ANSWERING'
            },
            mocks: {
                $matomo: matomoStub
            }
        })

        const currentQuestionIndex = 2
        wrapper.setData({ currentQuestionIndex })
        const currentQuestion = wrapper.vm.currentQuestion

        expect(currentQuestion).to.deep.equal(questions[currentQuestionIndex])
    })

    it('should return component typ of current question', () => {
        const wrapper = shallowMount(QuestionRouter, {
            propsData: {
                questions,
                assignmentName: 'lorem',
                assignmentState: 'ANSWERING'
            },
            mocks: {
                $matomo: matomoStub
            }
        })

        const currentQuestionIndex = 2
        wrapper.setData({ currentQuestionIndex })
        const currentQuestionComponent = wrapper.vm.currentQuestionComponent

        expect(currentQuestionComponent).to.equal(questions[currentQuestionIndex].component)
    })

    it('should compute data for current question', () => {
        const name = 'lorem'
        const wrapper = shallowMount(QuestionRouter, {
            propsData: {
                questions,
                assignmentName: name,
                assignmentState: 'ANSWERING'
            },
            mocks: {
                $matomo: matomoStub
            }
        })

        const currentQuestionIndex = 2
        wrapper.setData({ currentQuestionIndex })
        const currentQuestionData = wrapper.vm.currentQuestionData

        const expectedValue = {
            question: questions[currentQuestionIndex].question,
            answers: questions[currentQuestionIndex].answers,
            assignmentName: name,
            retry: true
        }

        expect(currentQuestionData).to.deep.equal(expectedValue)
    })

    it('should handle next question', () => {
        const wrapper = shallowMount(QuestionRouter, {
            propsData: {
                questions,
                assignmentName: name,
                assignmentState: 'ANSWERING'
            },
            mocks: {
                $matomo: matomoStub
            }
        })

        let currentQuestionIndex = wrapper.vm.currentQuestionIndex
        const nextQuestion = wrapper.vm.nextQuestion
        nextQuestion()
        expect(wrapper.vm.currentQuestionIndex).to.equal(currentQuestionIndex + 1)
    })

    it('should handle validation of questions', () => {
        const wrapper = shallowMount(QuestionRouter, {
            propsData: {
                questions,
                assignmentName: name,
                assignmentState: 'ANSWERING'
            },
            mocks: {
                $matomo: matomoStub
            }
        })

        const currentQuestionIndex = 2
        wrapper.setData({ currentQuestionIndex })
        const handleQuestionValidated = wrapper.vm.handleQuestionValidated
        const expectedValue = true
        handleQuestionValidated(expectedValue)
        expect(wrapper.vm.questions[currentQuestionIndex].$correct).to.equal(expectedValue)
        expect(wrapper).to.have.emitted('validated')
    })
})
