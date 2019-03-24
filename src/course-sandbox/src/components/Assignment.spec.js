import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Assignment from './Assignment.vue'

describe('Assignment.vue', () => {
    let sandbox = require('sinon').createSandbox()
    const matomoStub = {
        trackEvent: sandbox.stub()
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

    afterEach(() => {
        sandbox.reset()
    })

    after(() => {
        sandbox.restore()
    })

    const nextQuestionStub = sandbox.stub()
    const validateStub = sandbox.stub()
    const QuestionRouterStub = {
        render: () => {},
        methods: {
            nextQuestion: nextQuestionStub,
            validate: validateStub
        }
    }

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

    it('should initialize the assignment correctly', () => {
        const wrapper = shallowMount(Assignment, {
            propsData: {
                name,
                passedAt,
                questions
            }
        })

        expect(wrapper.vm.state).to.equal('NOT_STARTED')
        expect(wrapper.vm.lastQuestion).to.be.false
    })

    it('should handle validation as expected', () => {
        const wrapper = shallowMount(Assignment, {
            propsData: {
                retry: true,
                name,
                questions
            }
        })

        const handleQuestionValidated = wrapper.vm.handleQuestionValidated

        handleQuestionValidated(false)
        expect(wrapper.vm.state).to.equal('ANSWERING_RETRY')

        handleQuestionValidated(true)
        expect(wrapper.vm.state).to.equal('NEXT_QUESTION')

        wrapper.setData({ lastQuestion: true })
        handleQuestionValidated(true)
        expect(wrapper.vm.state).to.equal('FINISHED')
    })

    it('should call correct methods on button click', () => {
        const localValidateStub = sandbox.stub()
        const wrapper = shallowMount(Assignment, {
            propsData: {
                name,
                questions
            },
            stubs: {
                'QuestionRouter': QuestionRouterStub
            },
            mocks: {
                $matomo: matomoStub
            }
        })

        const handleControlsClick = wrapper.vm.handleControlsClick

        wrapper.setData({ state: 'NOT_STARTED' })
        handleControlsClick()
        expect(wrapper.vm.state).to.equal('ANSWERING')

        wrapper.setData({ state: 'FINISHED' })
        handleControlsClick()
        expect(nextQuestionStub).to.have.been.calledOnce
        expect(wrapper.vm.state).to.equal('SHOW_RESULTS')

        wrapper.setData({ state: 'NEXT_QUESTION' })
        handleControlsClick()
        expect(nextQuestionStub).to.have.been.calledTwice
        expect(wrapper.vm.state).to.equal('ANSWERING')

        wrapper.setData({ state: 'ANSWERING' })
        wrapper.setMethods({ validate: localValidateStub })
        handleControlsClick()
        expect(localValidateStub).to.have.been.calledOnce
        expect(wrapper.vm.state).to.equal('ANSWERING')
    })

    it('should call validate', () => {
        const wrapper = shallowMount(Assignment, {
            propsData: {
                name,
                questions
            },
            stubs: {
                'QuestionRouter': QuestionRouterStub
            }
        })

        const validate = wrapper.vm.validate
        validate()
        expect(validateStub).to.have.been.calledOnce
    })

    it('should handle last question', () => {
        const wrapper = shallowMount(Assignment, {
            propsData: {
                name,
                questions
            }
        })

        const handleLastQuestion = wrapper.vm.handleLastQuestion
        handleLastQuestion()
        expect(wrapper.vm.lastQuestion).to.be.true
    })
})
