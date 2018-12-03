import { expect } from 'chai'
import { spy, stub } from 'sinon'
import Code from './Code.vue'
import { shallowMount } from '@vue/test-utils'

describe('Code.vue', () => {
    it('highlightedLines validator only allows valid ranges', () => {
        const expectedValues = [
            { value: [], expects: true },
            { value: [1], expects: true },
            { value: [1, 5, 7], expects: true },
            { value: [[1, 2]], expects: true },
            { value: [[1]], expects: false },
            { value: [1, [1, 3], 4], expects: true },
            { value: [1, [1], 4], expects: false },
            { value: [-1], expects: false },
            { value: [0], expects: false },
            { value: [5, 5], expects: true },
            { value: [{}], expects: false },
            { value: ['1'], expects: false },
            { value: 5, expects: false },
            { value: [[7, 2]], expects: false },
            { value: [7.5], expects: false }
        ]

        const validator = Code.props.highlightedLines.validator

        expectedValues.forEach(({ value, expects }) => {
            expect(validator(value)).to.equal(expects, `validating ${value} to be ${expects}`)
        })
    })

    it('highlights correct lines', () => {
        const addLineClass = spy()
        const expectedValues = [
            { value: [1], expects: [0] },
            { value: [1, 2], expects: [0, 1] },
            { value: [1, [3, 5]], expects: [0, 2, 3, 4] }
        ]

        const highlightLines = Code.methods.highlightLines.bind({
            editor: {
                addLineClass
            }
        })

        expectedValues.forEach(({ value, expects }) => {
            highlightLines(value)

            expects.forEach((expects, index) => {
                expect(addLineClass.getCall(index).calledWith(expects), `validating ${value} to be ${expects}`).to.be.true
            })
            addLineClass.resetHistory()
        })
    })

    it('textarea is available', () => {
        const initialize = stub()
        const wrapper = shallowMount(Code, {
            methods: {
                initialize
            }
        })

        expect(wrapper.contains('textarea')).to.be.true
    })
})
