const { deepStrictEqual } = require('assert');

//Value type (Uses stack)
let counter = 2
let counter2 = counter
counter2 *= 5

deepStrictEqual(counter, 2)
deepStrictEqual(counter2, 10)
/*
 * The counter variable should containt the value of 2
 * The counter2 variable should contain the value of 10, and should not update the value of counter variable, 
 * because it's referenced by value
 */

//Reference type (Uses heap)
const counterObj = { counter: 10 }
const counterObj2 = counterObj
counterObj2.counter -= 3

deepStrictEqual(counterObj.counter, 7)
deepStrictEqual(counterObj2.counter, 7)

/*
 * The property counter is the same in both objects beacuse object in JS uses the same reference,
 * so the property counter will be both 7.
 */