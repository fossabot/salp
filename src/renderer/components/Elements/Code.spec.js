import { expect } from 'chai'
import { spy } from 'sinon'
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

        expectedValues.forEach(({ value, expects }, index) => {
            expect(validator(value)).to.equal(expects, `expectedValues[${index}]: validation of '${value}' should be ${expects}`)
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
                expect(addLineClass.getCall(index).calledWith(expects), `expectedValues[${index}]: validation of '${value}' should be ${expects}`).to.be.true
            })
            addLineClass.resetHistory()
        })
    })
})
