/* In JavaScript all data types are sucetible to type coercion, 
 but there's exist only three conversion at the end, that's for:

* String
* Number
* Boolean

There are two types os coercion:

* Implicity Coercion
* Explicty Coercion

Implicity Coercion is made when, for example, we sum a string with a number, when we use a non-boolean 
value in conditionals. So implicity coercion is when we drive the resposibility of the convertion to JS.

The table in website below show's the convertions the JS do when implicity coercion is used:

https://dorey.github.io/JavaScript-Equality-Table/

Implicity coercion occurs when we use loose equality operator (==), for example:

1 == '1' will be true as
"1" == [1] will also be true

So, in resume, never use loose equality operator (==) unless you have a good reason to do so.

In order to avoid above behavior always use deep equality operator (===), which default behavior is to 
never convert any value implicity and compare operands against it's types.

Explicty Coercion is explanatory by it self, obviusly. The programmer assume responsibility of 
convert to especific type before use. Let's do some assertions!

*/

const { deepStrictEqual, throws } = require('assert');

console.log('\n\nPrimitive type coercion and implicity boolean coercion')
console.log('-------------------------------------------------------\n')
{
    console.log(`Explicty coercion to string  ->  String(123) == '123'\n`, )
    deepStrictEqual(String(123), '123')
}
{
    console.log(`Implicity coercion to string  ->  123 + '' == '123'\n`)
    deepStrictEqual(123 + '', '123')
}
{
    console.log('Conditional statements do implicity convertion\n')
    console.log(`|| returns the first truthy element  ->  'hello' || 123 returns 'hello'\n`)
    console.log(`|| returns the first truthy element  ->  'null || 123 returns 123\n`)
    deepStrictEqual('hello' || 123, 'hello')
    deepStrictEqual(null || 123, 123)
}
{
    console.log('Conditional statements do implicity convertion\n')
    console.log(`&& returns the last element  ->  'hello' && 123 returns '123'\n`)
    console.log(`&& returns the last element  ->  123 && '123' returns '123'\n`)
    deepStrictEqual('hello' && 123, 123)
    deepStrictEqual(123 && '123', '123')
}

console.log('-------------------------------------------------------\n\n')

/* 
    Object coercion work form a diferent way.

    Every object has some default methods like toString, isPrototypeOf, hasOwnProperty, valueOf and etc.

    When JS try to coercion an object the above steps will be taken:

    Firstly if a type is primitive, the primitive type is returned.
    Secondly toString will be called, is the result was primitive, it will be returned.
    Thirdly valueOf will be called, if the result was primitive, it will be returned.
    If either toString or valueOf return type was not primitive, a TypeError will be thrown.
    If the convertion was a numeric type valueOf will be called first, then toString, otherwise
    toString will be called then valueOf.
    Symbol.toPrimitive introduced in ES6 is a higher priority order, if you implement it, it will ignore
    toString and valueOf. Let's assert to see this behaviors.
*/

console.log(`Object's implicity coercion`)
console.log('-------------------------------------------------------\n')
console.log('-------------------------------------------------------\n')

const item = {
    name: 'Jardel Matias',
    age: 26,
    toString() {
        return JSON.stringify(this)
    },
    valueOf() {
        return -1
    }
}

const itemWithError = {
    name: 'Jardel Matias',
    age: 26,
    toString() {
        return {}
    },
    valueOf() {
        return {}
    }
}

const itemWithSymbolPrimitive = {
    name: 'Jardel Matias',
    age: 26,
    toString() {
        return JSON.stringify(this)
    },
    valueOf() {
        return -1
    },
    [Symbol.toPrimitive](type) {
        if(type === 'number') return JSON.stringify(this).length
        if(type === 'string') return `string: ${JSON.stringify(this)}`
        return true
    }
}

{
    console.log('Should return JSON representation of object item when converted to string')
    deepStrictEqual(String(item), JSON.stringify(item))
}
{
    console.log('Should return -1 when convert to number')
    deepStrictEqual(Number(item), -1)
}
{
    console.log('Should throw and TypeError exception because no primitive type is returned')
    throws(() => String(itemWithError), TypeError)
}
{
    console.log('Should ignore valueOf and toString when convert to string')
    deepStrictEqual(String(itemWithSymbolPrimitive), `string: ${JSON.stringify(itemWithSymbolPrimitive)}`)
}
{
    console.log('Should ignore valueOf and toString when convert to number')
    deepStrictEqual(Number(itemWithSymbolPrimitive), 33)
}
{
    console.log('Should ignore valueOf and toString and use default behavior of Symbol.toPrimitive')
    deepStrictEqual(Boolean(itemWithSymbolPrimitive + ''), true)
}