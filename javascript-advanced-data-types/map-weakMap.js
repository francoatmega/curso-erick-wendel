const { deepStrictEqual, throws } = require('assert');

// Recommended when you wnat dinacmicly create or remove keys, and need to avoid key conflicts

// Some benefits of Map: 

// Method to verify is a key exist
// Method to remove a key with perfomance
// Implements generator pattern
// Uses objects as key search

const myMap = new Map()

myMap
    .set(1, 'Valor 1')
    .set('Jardel', 'Valor do jardel')
    .set(true, () => 'Valor unico')

{
    deepStrictEqual(myMap.get(1), 'Valor 1')
}
{
    deepStrictEqual(myMap.get('Jardel'), 'Valor do jardel')
}
{
    deepStrictEqual(myMap.get(true)(), 'Valor unico')
}

// In object literal keys can only be strings or symbols (number is coerced to string)

const reference = { id: 1 }
myMap.set(reference, { name: 'JardelMatias'})

{
    deepStrictEqual(myMap.get({ id: 1 }), undefined)
}
{
    deepStrictEqual(myMap.get(reference), { name: 'JardelMatias'})
}

// Getting size of properties in object literal has to use Object.keys({ a: 1}).length
// With Map there's a property called size, who have the size of properties of an Map

{
    deepStrictEqual(myMap.size, 4)
}

// To verify if a property exists in object literal has to used hasOwnProperty ou access the item in a boolean context
// With Map there's a method called has, who return an boolean indicating that a specified key has in a Map object

{
    deepStrictEqual(myMap.has(1), true)
}
{
    deepStrictEqual(myMap.has('NonExistentKey'), false)
}

// To delete a property in object literal there's the keyword delete, who isn't perfomactic
// With Map there's a method called delete who is performatic

{
    deepStrictEqual(myMap.delete('NonExistentKey'), false)
}

{
    deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([
        [ 1, 'Valor 1' ],
        [ 'Jardel', 'Valor do jardel' ],
        [ true, () => {} ],
        [ { id: 1 }, { name: 'JardelMatias' } ]
      ]))
}

// Object literal is vulnerable to Prototype pollution, Map isn't, with Map there's no such problem, keys cannot collid

{
    deepStrictEqual(({ toString: () => 'Hacked function' }).toString(), 'Hacked function')
}

{
    const antiKeyColidObject = {
        toString: () => console.log('Failed hacked function')
    }
    const securityMap = new Map()
    securityMap.set(antiKeyColidObject) 
    throws(() => (securityMap.get(antiKeyColidObject)).toString(), TypeError)
}

// With object literal there's no wait to clean it without reassign all keys to undefined or use delete
// With Map there's a method called clear, how clean of properties from a Map

{
    myMap.clear()
    deepStrictEqual(myMap.size, 0)
    deepStrictEqual([...myMap.keys()], [])
}

// In resume, we can use Map when we need: 

// Need to add and remove keys frequently
// Need to validate if the key exists semantically
// Need an object to behavior like a database
// Need to clear reference after use
// To improve security against prototype pollution 

// ----------------------------------------------------------------
// When to use WeakMap:

// If you only need to add or remove keys by id, the ideal is to use WeakMap
// Can only add objects as keys
// It's not an enumerator
// Much more performant, they will only be saved as long as they exist in memory, avoiding memory leaks
// Since the GC clears the references of that key it is also removed from WeakMap 

const weakMap = new WeakMap()

const hero = { name: 'Flash' }

weakMap.set(hero)
weakMap.get(hero)
weakMap.delete(hero)
weakMap.has(hero)
