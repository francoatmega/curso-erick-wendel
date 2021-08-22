const { describe, it, beforeEach, afterEach } = require('mocha')
const CarService = require('../../service/carService')
const baseRepository = require('../../database/repository/baseRepository')
const { expect } = require('chai')
const sinon = require('sinon')

const mocks = {
    validCar: require('./../mocks/valid-car.json'),
    validCarCategory: require('./../mocks/valid-carCategory.json'),
    validCustomer: require('./../mocks/valid-customer.json'),
}

describe('CarService Test Suite', () => {
    let sandbox = {}
    beforeEach(() => sandbox = sinon.createSandbox())

    afterEach(() => sandbox.restore())

    it('should retrieve a random position from an array', () => {
        const randomData = [ 0, 1, 2, 3, 4]
        const result = CarService.getRandomIndex(randomData)
        expect(result).to.be.gte(0).and.to.be.lte(randomData.length)
    })

    it('should choose the first id from carsIds in carCategory', () => {
        const carCategory = mocks.validCarCategory
        const carIndex = 0
        const stubGetRandomIndex = sandbox.stub(CarService, 'getRandomIndex').returns(carIndex)
        const result = CarService.chooseRandomCar(carCategory)
        const expected = carCategory.carsIds[carIndex]
        expect(stubGetRandomIndex.calledOnce).to.be.equal(true)
        expect(result).to.be.equal(expected)
    })

    it('given a carCategory it should return an available car', async () => {
        const car = mocks.validCar
        const carCategory = Object.create(mocks.validCarCategory)
        carCategory.carsIds = [car.id]
        sandbox.stub(baseRepository, 'find').resolves(car)
        sandbox.spy(CarService, 'chooseRandomCar')
        const result = await CarService.getAvailableCar(carCategory)
        expect(CarService.chooseRandomCar.calledOnce).be.true
        expect(baseRepository.find.calledWithExactly('cars', car.id)).be.ok
        expect(result).to.be.deep.equal(car)
    })
})