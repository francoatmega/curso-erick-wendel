const { describe, it } = require('mocha')
const { expect } = require('chai')
const { evaluateRegex, UnsafeRegexError } = require('../src/helpers')
const { unsafeRegex, safeRegex } = require('../tests/mocks/regexMock')

describe('Test of regex helper', () => {
    it('should throw an error when a unsafe regex is used', () => {
        expect(() => evaluateRegex(unsafeRegex)).to.throw(UnsafeRegexError)
    }),
    it('should return regex when a safe regex is used', () => {
        expect(evaluateRegex(safeRegex)).to.be.equal(safeRegex)
    })
})