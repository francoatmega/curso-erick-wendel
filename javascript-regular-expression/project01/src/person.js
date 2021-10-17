const { evaluateRegex } = require('../src/helpers')

class Person {
    constructor([
        nome,
        nacionalidade,
        estadoCivil,
        CPF,
        rua,
        numero,
        bairo,
        estado
    ]) {
        this.nome = nome,
        this.nacionalidade = this.firstLetterUpperCase(nacionalidade),
        this.estadoCivil = this.firstLetterUpperCase(estadoCivil),
        this.CPF = this.getDigits(CPF),
        this.rua = this.getStreet(rua),
        this.numero = numero,
        this.bairo = this.getNeiborhood(bairo),
        this.estado = this.formatState(estado)
    }

    firstLetterUpperCase (property) {
        const firstLetterRegex = evaluateRegex(/^(\w)(.*)/)
        return property.replace(firstLetterRegex, (matched, firstGroup, secondGroup, index) => {
            return `${firstGroup.toUpperCase()}${secondGroup.toLowerCase()}`
        })
    }

    getDigits(property) {
        const digitsRegex = evaluateRegex(/\D/g)
        return property.replace(digitsRegex, '')
    }

    getStreet(property) {
        const streetAddress = evaluateRegex(/(?<= a ).*$/i)
        return property.match(streetAddress).join('')
    }

    getNeiborhood(property) {
        return property.match(evaluateRegex(/(?<=Bairro ).*$/i)).join('')
    }

    formatState(property) {
        return property.replace(evaluateRegex(/\./), '')
    }
}

module.exports = Person