import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import MultipleChoice from './MultipleChoice.vue'

describe('MultipleChoice.vue', () => {
    const expectedValues = [
        {
            answers: [
                { answer: 'lorem', correct: true },
                { answer: 'ipsum', correct: false },
                { answer: 'dollor', correct: true }
            ],
            checked: [
                0,
                2
            ],
            expects: true
        },
        {
            answers: [
                { answer: 'lorem', correct: true },
                { answer: 'ipsum', correct: false },
                { answer: 'dollor', correct: true }
            ],
            checked: [
                0,
                1,
                2
            ],
            expects: false
        },
        {
            answers: [
                { answer: 'lorem', correct: true },
                { answer: 'ipsum', correct: false },
                { answer: 'dollor', correct: true }
            ],
            checked: [
                2
            ],
            expects: false
        },
        {
            answers: [
                { answer: 'lorem', correct: true },
                { answer: 'ipsum', correct: false },
                { answer: 'dollor', correct: true }
            ],
            checked: [
            ],
            expects: false
        }
    ]

    const question = 'Lorem ipsum dollor sit atmet?'

    expectedValues.forEach(({ answers, checked, expects }, index) => {
        it(`should update the v-model of answer, checked:${checked}`, () => {
            let wrapper = mount({
                data() {
                    return {
                        answers,
                        question,
                        answer: ''
                    }
                },
                template: `<div><MultipleChoice question="question" :answers="answers" v-model="answer"/></div>`,
                components: {
                    MultipleChoice
                }
            })

            checked.forEach(checked => {
                const radioButton = wrapper.findAll('.multiple-choice-content__container__checkbox-group__checkbox').at(checked)
                if (radioButton) {
                    radioButton.trigger('click')
                }
            })
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
                expects: true
            }
        ]

        const validator = MultipleChoice.props.answers.validator

        expectedValues.forEach(({ answers, expects }, index) => {
            it(`should validate answers '${JSON.stringify(answers[0])}...' with ${expects} (${index})`, () => {
                expect(validator(answers)).to.equal(expects)
            })
        })
    })
})
