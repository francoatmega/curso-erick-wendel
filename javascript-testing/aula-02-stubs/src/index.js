const starWarsService = require('./starWarsService')
const { deepStrictEqual } = require('assert')
const sinon = require('sinon')
const mockTatooine = require('../mocks/tatooine')
const mockAlderaan = require('../mocks/alderaan')
const tatooineId = '1'
const alderaanId = '2'

;(async ()=> {
    {
        const stub = sinon.stub(starWarsService, 'getPlanetById')
        stub.withArgs(tatooineId).resolves(mockTatooine)
        stub.withArgs(alderaanId).resolves(mockAlderaan)
    }
    {
        const result = await starWarsService.getPlanetById(tatooineId)
        deepStrictEqual(result.name, 'Tatooine')
        deepStrictEqual(result.films.length, 5)
        deepStrictEqual(result.population, '200000')
    }
    {
        const result = await starWarsService.getPlanetById(alderaanId)
        deepStrictEqual(result.name, 'Alderaan')
        deepStrictEqual(result.films.length, 2)
        deepStrictEqual(result.population, '2000000000')
    }
})()