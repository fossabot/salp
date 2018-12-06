import { expect } from 'chai'
import { truncateFunction } from './truncate'

describe('truncate.js', () => {
    const expectedLength = 40
    const text = 'This course will introduce you to SQL injections which are commonly found in web applications'
    const expectedOmission = '...'

    it(`Text should be omitted when it has more chracters then allowed.`, () => {
        expect(truncateFunction(text, expectedLength).length).to.equal(expectedLength)
    })

    it(`Last 3 characters should be ${expectedOmission} when text is omitted.`, () => {
        expect(truncateFunction(text, expectedLength).endsWith(expectedOmission)).to.be.true
    })

    it(`Text should not be omitted when number of characters is allwoed.`, () => {
        expect(truncateFunction(text, text.length)).to.equal(text)
    })
})
