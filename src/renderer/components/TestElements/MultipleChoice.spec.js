import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
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
                'dollor',
                'lorem'
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
                'dollor',
                'ipsum',
                'lorem'
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
                'dollor'
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
        it(`should return ${expects} for checked answers`, () => {
            const wrapper = shallowMount(MultipleChoice, {
                propsData: {
                    question,
                    answers
                }
            })

            wrapper.setData({
                checked
            })

            const correct = wrapper.vm.correct

            expect(correct).to.eq(expects)
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
