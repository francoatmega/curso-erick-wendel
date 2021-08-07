const fibonnaci = require('./fibonnaci')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')

;(() => {
    {
        const spy = sinon.spy(fibonnaci, 'calculate')
        const nthTerm = fibonnaci.calculate(9)
        deepStrictEqual(spy.called, true)
        deepStrictEqual(spy.callCount, 109)
        deepStrictEqual(nthTerm, 34)
        spy.restore()
    }
    {
        const spy = sinon.spy(fibonnaci, 'calculate')
        try { 
            fibonnaci.calculate(-1)
        } catch (e) { }
        deepStrictEqual(spy.threw("Error"), true)
        spy.restore()
    }
})()