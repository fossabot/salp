import { expect } from 'chai'
import Code from './Code.vue'

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
})
