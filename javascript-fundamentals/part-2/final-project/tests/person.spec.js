import { describe, it } from 'mocha'
import { expect } from 'chai'
import Person from '../src/person.js'

describe('Tests of Person class', () => {
    it('should test constructor of Person object', () => {
        const person = new Person({ id: 1, vehicles: 'cars, motors, trucks', kmTraveled: '1000', from: '2021-10-01', to: '2021-10-30'})
        expect(person).to.be.instanceOf(Person)
        expect(person.kmTraveled).to.be.equal('1000')
    })
    it('should test if string is converted on Person object', () => {
        const person = Person.fromString('1 cars,motors,jet_sky 100000 2021-10-21 2021-10-22')
        expect(person).to.be.instanceOf(Person)
        expect(person.id).to.be.equal('1')
        expect(person.vehicles).to.have.members(['cars', 'motors', 'jet_sky'])
        expect(person.kmTraveled).to.be.equal('100000')
        expect(person.from).to.be.equal('2021-10-21')
        expect(person.to).to.be.equal('2021-10-22')
    })
    it('should test internationalization convertion of Person object with default languange', () => {
        const person = Person.fromString('1 cars,motors,jet_sky 100000 2021-10-21 2021-10-22')
        const parsedPerson = person.transform()
        expect(parsedPerson.kmTraveled).to.be.equal('100.000 km')
        expect(parsedPerson.vehicles).to.be.equal('cars, motors e jet_sky')
        expect(parsedPerson.from).to.be.equal('21 de outubro de 2021')
        expect(parsedPerson.to).to.be.equal('22 de outubro de 2021')
    })
    it('should test internationalization convertion of Person object with english languange', () => {
        const person = Person.fromString('1 cars,motors,jet_sky 100000 2021-10-21 2021-10-22')
        const parsedPerson = person.transform('en-US')
        expect(parsedPerson.kmTraveled).to.be.equal('100,000 km')
        expect(parsedPerson.vehicles).to.be.equal('cars, motors, and jet_sky')
        expect(parsedPerson.from).to.be.equal('October 21, 2021')
        expect(parsedPerson.to).to.be.equal('October 22, 2021')
    })
})

