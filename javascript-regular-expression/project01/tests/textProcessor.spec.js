const { describe, it } = require('mocha')
const { expect } = require('chai')
const TextProcessor = require('../src/textProcessor')
const validHirerAndHire = require('./mocks/validHirerAndHire')

describe('Test of TextProcessor class', () => {
    it('should return content when build is called without data processing', () => {
        const result = new TextProcessor(validHirerAndHire).build()
        expect(result).to.be.equal(validHirerAndHire)
    })
    it('should return extracted hirer and hire data is extracted', () => {
        const resultExtracted = new TextProcessor(validHirerAndHire).extractHirerAndHireData().build()
        const expected = [
            'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e \ndomiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ',
            `Arya Robbin, belga, casado, CPF 884.112.200-52, residente e \ndomiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. `,
            `Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e \ndomiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo.`
        ]
        expect(resultExtracted).to.have.members(expected)
    })
}) 