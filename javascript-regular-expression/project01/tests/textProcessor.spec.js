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
    it('should divide extracted data in columns', () => {
        const expected = [
            'Xuxa da Silva',
            ' brasileira',
            ' casada', 
            ' CPF 235.743.420-12',
            ' residente e \ndomiciliada a Rua dos bobos',
            ' zero',
            ' bairro Alphaville',
            ' São Paulo. '
        ]
        const resultColumns = new TextProcessor(validHirerAndHire).extractHirerAndHireData().splitIntoColumns().build()
        expect(resultColumns).to.be.an('array').deep.include(expected)
    })
    it('should trim spaces and remove break lines', () => {
        const content = [
            [
              'Xuxa da Silva',
              ' brasileira',
              ' casada',
              ' CPF 235.743.420-12',
              ' residente e \ndomiciliada a Rua dos bobos',
              ' zero',
              ' bairro Alphaville',
              ' São Paulo. '
            ],
            [
              'Arya Robbin',
              ' belga',
              ' casado',
              ' CPF 884.112.200-52',
              ' residente e \ndomiciliada a Av. paulista',
              ' 1400',
              ' bairro Consolação',
              ' São Paulo. '
            ],
            [
              'Júlia Menezes',
              ' brasileira',
              ' solteira',
              ' CPF 297.947.800-81',
              ' residente e \ndomiciliada a Av. dos Estados',
              ' 99',
              ' bairro Jardins',
              ' São Paulo.'
            ]
        ]
        const expected = [
            'Xuxa da Silva',
            'brasileira',
            'casada',
            'CPF 235.743.420-12',
            'residente e domiciliada a Rua dos bobos',
            'zero',
            'bairro Alphaville',
            'São Paulo.'
        ]
        const result = new TextProcessor(content).stripString().build()
        expect(result).to.be.an('array').deep.include(expected)
    })
    it('should convert each hirer or hire into Person object', () => {
        const content = [
            [
              'Xuxa da Silva',
              'brasileira',
              'casada',
              'CPF 235.743.420-12',
              'residente e domiciliada a Rua dos bobos',
              'zero',
              'bairro Alphaville',
              'São Paulo.'
            ],
            [
              'Arya Robbin',
              'belga',
              'casado',
              'CPF 884.112.200-52',
              'residente e domiciliada a Av. paulista',
              '1400',
              'bairro Consolação',
              'São Paulo.'
            ],
            [
              'Júlia Menezes',
              'brasileira',
              'solteira',
              'CPF 297.947.800-81',
              'residente e domiciliada a Av. dos Estados',
              '99',
              'bairro Jardins',
              'São Paulo.'
            ]
        ]
        const expectPersons = [
            {
                nome: 'Xuxa da Silva',
                nacionalidade: 'Brasileira',
                estadoCivil: 'Casada',
                CPF: '23574342012',
                rua: 'Rua dos bobos',
                numero: 'zero',
                bairo: 'Alphaville',
                estado: 'São Paulo'
            },
            {
                nome: 'Arya Robbin',
                nacionalidade: 'Belga',
                estadoCivil: 'Casado',
                CPF: '88411220052',
                rua: 'Av. paulista',
                numero: '1400',
                bairo: 'Consolação',
                estado: 'São Paulo'
            },
            {
                nome: 'Júlia Menezes',
                nacionalidade: 'Brasileira',
                estadoCivil: 'Solteira',
                CPF: '29794780081',
                rua: 'Av. dos Estados',
                numero: '99',
                bairo: 'Jardins',
                estado: 'São Paulo'
            }
        ]
        const result = new TextProcessor(content).mapPerson().build()
        expect(result).to.be.an('array').deep.equal(expectPersons)
    })
}) 