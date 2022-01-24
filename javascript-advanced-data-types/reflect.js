const { deepStrictEqual, throws } = require('assert')

//Reflect API improve semantic and security of JS

const myObject = {
    sum(value) {
        return this.num1 + this.num2 + value;
    }
}

deepStrictEqual(Reflect.apply(myObject.sum, { num1: 10, num2: 10 }, [10]), 30)

Reflect.defineProperty(myObject, 'name', { value: 'Jardel' })
deepStrictEqual(myObject.name, 'Jardel')

// When try to access a property in a primitive value only wiht Reflect a type error is thrown
deepStrictEqual(1['name'], undefined)
throws(() => { Reflect.get(1, 'name') }, TypeError)

// It's possible to get all keys with Reflect more easier

const symbol1 = Symbol('userSymbol')
const user = {
    id: 1,
    [Symbol.for('test')]: '123',
    [symbol1]: 'test1'
}

const objectKeys = [
    ...Object.getOwnPropertyNames(user),
    ...Object.getOwnPropertySymbols(user),
]

const objectKeysByReflect = Reflect.ownKeys(user)

deepStrictEqual(objectKeys, objectKeysByReflect)
