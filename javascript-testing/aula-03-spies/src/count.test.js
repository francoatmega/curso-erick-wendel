const count = require('./count')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')
 
;(async () => {
    {
        const spy = sinon.spy(count, 'countDownZombies')
        count.countDownZombies(4)
        deepStrictEqual(spy.callCount, 4)
        spy.restore()
    }
    {
        const spy = sinon.spy(count, 'countDownZombies')
        count.countDownZombies(10)
        const { args } = spy.getCall(3)
        const [ countValue ] = args
        deepStrictEqual(spy.callCount, 10)
        deepStrictEqual(countValue, 7)
        spy.restore()
    }
    {
        const spy = sinon.spy(count, 'countDownZombies')
        count.countDownZombies(1)
        deepStrictEqual(spy.callCount, 1)
        spy.restore()
    }
})()