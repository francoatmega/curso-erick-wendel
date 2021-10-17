const { describe, it } = require('mocha')
const { expect } = require('chai')
const Person = require('../src/person')

describe('Test of Person class', () => {
    it('should return and Person object from hirer text', () => {
        const content = [
            'Xuxa da Silva',
            'brasileira',
            'casada',
            'CPF 235.743.420-12',
            'residente e domiciliada a Rua dos bobos',
            'zero',
            'bairro Alphaville',
            'São Paulo.'
        ]
        const person = new Person(content)
        const expected = {
            nome: 'Xuxa da Silva',
            nacionalidade: 'Brasileira',
            estadoCivil: 'Casada',
            CPF: '23574342012',
            rua: 'Rua dos bobos',
            numero: 'zero',
            bairo: 'Alphaville',
            estado: 'São Paulo'
        }
        expect(person).to.be.deep.equal(expected)
    })
})