const { deepStrictEqual, throws } = require('assert');

// Is a primitive type used to create a unique value in memory

const uniqueKey = Symbol('unique')
const user = {}

user['unique'] = 'Value of normal object'
user[uniqueKey] = 'Value of symbol object'

{
    console.log('-----------------------------------------------------------------------')
    console.log('should return value of normal property')
    deepStrictEqual(user.unique, 'Value of normal object')
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}
{
    console.log('-----------------------------------------------------------------------')
    console.log('should return right value of property acessed byt original symbol')
    deepStrictEqual(user[uniqueKey], 'Value of symbol object')
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}
{
    console.log('-----------------------------------------------------------------------')
    console.log('should return undefined when acessing property without original symbol')
    deepStrictEqual(user[Symbol('unique')], undefined)
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
} 
{
    console.log('-----------------------------------------------------------------------')
    console.log('should get same symbol reference')
    deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}
{
    console.log('-----------------------------------------------------------------------')
    console.log('should have equal symbol reference - bad practice')
    user[Symbol.for('test1')] = 123123
    deepStrictEqual(user[Symbol.for('test1')], 123123)
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}

// Default symbols
Symbol.iterator
Symbol.toStringTag

const kItems = Symbol('kItems')

class myDate {
    constructor(...args) { 
        //Usado para criar um método ou propriedade privada
        this[kItems] = args.map(arg => new Date(...arg))
    }
    [Symbol.toPrimitive](coercionType) {
        if(coercionType !== 'string')  throw new TypeError()
    }
    get [Symbol.toStringTag]() {
        return 'Undefined object'
    }
}

const dates = new myDate(
    [2021, 01, 01],
    [2021, 01, 02]
)

{
    console.log('-----------------------------------------------------------------------')
    console.log('should return Undefined object when trying to convert object to string')
    deepStrictEqual(dates.toString(), '[object Undefined object]')
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}
{
    console.log('-----------------------------------------------------------------------')
    console.log('should throw TypeError when trying to convert object into number')
    throws(() => dates + 1, TypeError)
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}