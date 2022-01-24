const { deepStrictEqual } = require('assert')


//Set only works with unique values, being theses values primitives or object reference.
//Set follow the order of elements insertion

const arr1 = ["0", "0", "1", "1", "2"]
const arr2 = ["0", "2", "2", "3"]
const arr3 = [ ...arr1, ...arr2 ]
const set = new Set(arr3)

//Set remove duplicade items
deepStrictEqual(arr3.length, 9)
deepStrictEqual(set.size, 4) 

//Has keys and values property to access items
//Transforming the Set returning in array with Array.from or spread
deepStrictEqual(Array.from(set.keys()), ['0', '1', '2','3'])
deepStrictEqual([...set.values()], ['0', '1', '2','3'])

//For verify items in Set
deepStrictEqual(set.has('3'), true)
deepStrictEqual(set.has('23'), false)

 // WeakSet is to store weakly objects only and has the above methods
const user1 = { nome: 'Jardel'}
const user2 = { nome: 'Maria'}

const wk = new WeakSet()
wk.add(user1).add(user2)
deepStrictEqual(wk.has(user1), true)
wk.delete(user2)
deepStrictEqual(wk.has(user2), false)
