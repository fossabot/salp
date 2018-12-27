import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import SingleChoice from './SingleChoice.vue'

describe('SingleChoice.vue', () => {
    const expectedValues = [
        {
            answers: [
                { answer: 'lorem', correct: false },
                { answer: 'ipsum', correct: false },
                { answer: 'dollor', correct: true }
            ],
            checked: 2,
            expects: true
        },
        {
            answers: [
                { answer: 'lorem', correct: true },
                { answer: 'ipsum', correct: false },
                { answer: 'dollor', correct: false }
            ],
            checked: 1,
            expects: false
        },
        {
            answers: [
                { answer: 'lorem', correct: false },
                { answer: 'ipsum', correct: false },
                { answer: 'dollor', correct: false }
            ],
            checked: -1,
            expects: true
        }
    ]

    const question = 'Lorem ipsum dollor sit atmet?'

    expectedValues.forEach(({ answers, checked, expects }) => {
        it(`should update the v-model of answer, checked:${checked}`, () => {
            let wrapper = mount({
                data() {
                    return {
                        answers,
                        question,
                        answer: ''
                    }
                },
                template: `<div><SingleChoice question="question" :answers="answers" v-model="answer"/></div>`,
                components: {
                    SingleChoice
                }
            })

            const radioButton = wrapper.findAll('.single-choice-content__container__radio-group__radio').at(checked)
            if (radioButton) {
                radioButton.trigger('click')
            }
            expect(wrapper.vm.$data.answer).to.equal(expects)
        })
    })

    describe('answers validator', () => {
        const expectedValues = [
            {
                answers: [],
                expects: false
            },
            {
                answers: [
                    { answer: 'lorem' }
                ],
                expects: false
            },
            {
                answers: [
                    { correct: true }
                ],
                expects: false
            },
            {
                answers: [
                    { lorem: 'lorem', ipsum: true }
                ],
                expects: false
            },
            {
                answers: [
                    { answer: 1, correct: true }
                ],
                expects: false
            },
            {
                answers: [
                    { answer: 'lorem', correct: 'true' }
                ],
                expects: false
            },
            {
                answers: [
                    { answer: 'lorem', correct: true }
                ],
                expects: true
            },
            {
                answers: [
                    { answer: 'lorem', correct: true },
                    { answer: 'ipsum', correct: false },
                    { answer: 'dollor', correct: true }
                ],
                expects: false
            },
            {
                answers: [
                    { answer: 'lorem', correct: true },
                    { answer: 'ipsum', correct: false },
                    { answer: 'dollor', correct: false }
                ],
                expects: true
            }
        ]

        const validator = SingleChoice.props.answers.validator

        expectedValues.forEach(({ answers, expects }, index) => {
            it(`should validate answers '${JSON.stringify(answers[0])}...' with ${expects} (${index})`, () => {
                expect(validator(answers)).to.equal(expects)
            })
        })
    })
})
