import { expect } from 'chai'
import { stub } from 'sinon'
import { shallowMount } from '@vue/test-utils'
import UserInput from './UserInput.vue'

describe('UserInput.vue', () => {
    const assignmentName = 'lorem'
    const question = 'Lorem ipsum dollor sit atmet?'
    const answers = [
        { answer: 'lorem' }
    ]

    describe('Positioning of the question', () => {
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
                        answers,
                        correctCallback: stub(),
                        assignmentName,
                        retry: true
                    }
                })

                expect(wrapper).to.have.classes(expects)
            })
        })
    })

    const expectedValues = [
        { input: 'lorem', expects: true },
        { input: '        lorem       ', expects: true },
        { input: 'Lorem', expects: false },
        { input: '', expects: false }
    ]

    expectedValues.forEach(({ input, expects }) => {
        it(`should validate input:${input} to ${expects}`, () => {
            const wrapper = shallowMount(UserInput, {
                propsData: {
                    question,
                    answers,
                    assignmentName,
                    retry: true
                }
            })

            wrapper.setData({
                answer: input
            })

            wrapper.vm.validate()
            expect(wrapper).to.have.emitted('validated', 1).which.deep.equals([[expects]])
        })
    })
})
