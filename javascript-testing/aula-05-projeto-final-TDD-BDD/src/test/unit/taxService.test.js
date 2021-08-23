const { describe, it } = require('mocha')
const taxService = require('../../service/taxService')
const { expect } = require('chai')

describe('TaxService Test Suite', () => {
    it('given an amount should return formatted in brazilian currency', () => {
        const amount = 1234.67
        const expected = Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL'
        }).format(amount)
        const result = taxService.formatCurrency(amount)
        expect(result).to.be.equal(expected)
    })

    it('given an age between 18 and 25 should return 10% of tax', () => {
        const expected = 1.1
        const result = taxService.getTaxByAge(18)
        expect(result).to.be.equal(expected)
    })

    it('given an age between 26 and 30 should return 50% of tax', () => {
        const expected = 1.5
        const result = taxService.getTaxByAge(27)
        expect(result).to.be.equal(expected)
    })

    it('given an age between 31 and 99 should return 30% of tax', () => {
        const expected = 1.3
        const result = taxService.getTaxByAge(51)
        expect(result).to.be.equal(expected)
    })

    it('given an age lower than 18 and greater than 99 should throw an error', () => {
        expect(function() {
            taxService.getTaxByAge(17)
        }).to.throw('Invalid age')
    })
})