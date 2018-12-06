import { expect } from 'chai'
import { truncateFilter } from './truncate'

describe('truncate.js', () => {
    const expectedLength = 40
    const text = 'This course will introduce you to SQL injections which are commonly found in web applications'
    const expectedOmission = '...'

    it(`length should not be more then ${expectedLength} characters if length is ${expectedLength}`, () => {
        expect(truncateFilter(text, expectedLength).length).to.equal(expectedLength)
    })

    it(`last 3 chars should be ${expectedOmission} if length greater then ${expectedLength}`, () => {
        expect(truncateFilter(text, expectedLength).endsWith(expectedOmission)).to.be.true
    })

    it(`text should not be omitted if length is text.length`, () => {
        expect(truncateFilter(text, text.length)).to.equal(text)
    })
})
