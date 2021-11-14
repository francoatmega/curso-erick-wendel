const { deepStrictEqual } = require('assert');

 function* calculation(number1, number2) {
     yield number1 * number2;
 }

 function *main() {
     yield 'Hello '
     yield 'World'
     yield '!'
     yield* calculation(5, 3)
 }

 const generatorFunction = main()

//  console.log(generatorFunction.next())
//  console.log(generatorFunction.next())
//  console.log(generatorFunction.next())
//  console.log(generatorFunction.next())
//  console.log(generatorFunction.next())

{
    console.log('-----------------------------------------------------------------------')
    console.log('should return value \'Hello \' and that this iterator not ended')
    deepStrictEqual(generatorFunction.next(), { value: 'Hello ', done: false })
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}
{
    console.log('-----------------------------------------------------------------------')
    console.log('should return value \'World\' and that this iterator not ended')
    deepStrictEqual(generatorFunction.next(), { value: 'World', done: false })
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}
{
    console.log('-----------------------------------------------------------------------')
    console.log('should return value \'!\' and that this iterator not ended')
    deepStrictEqual(generatorFunction.next(), { value: '!', done: false })
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}
{
    console.log('-----------------------------------------------------------------------')
    console.log('should return value \'15\' and that this iterator not ended')
    deepStrictEqual(generatorFunction.next(), { value: 15, done: false })
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}
{
    console.log('-----------------------------------------------------------------------')
    console.log('should return value undefined and that this iterator ended')
    deepStrictEqual(generatorFunction.next(), { value: undefined, done: true })
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}

{
    console.log('-----------------------------------------------------------------------')
    console.log('should return values of iterator in an array when calling iterator from Array.from')
    const values = Array.from(main())
    deepStrictEqual(values, ['Hello ', 'World', '!', 15])
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}

{
    console.log('-----------------------------------------------------------------------')
    console.log('should return values of iterator in an array when calling iterator with spread operator')
    const values = [...main()]
    deepStrictEqual(values, ['Hello ', 'World', '!', 15])
    console.log('OK')
    console.log('-----------------------------------------------------------------------')
}

const { readFile, stat, readdir } = require('fs/promises')
function* promisified() {
    yield readFile(__filename)
    yield Promise.resolve('Hey Dude')
}

async function* systemInfo() {
    const file = await readFile(__filename)
    yield { file: file.toString() }

    const { size } = await stat(__filename)
    yield { size }
 
    const dir = await readdir(__dirname)
    yield { dir }
}

// Promise.all([...promisified()]).then(result => console.log(result))
// ;(async () => {
//     for await (const item of promisified()) {
//         console.log(item)
//     }
// })()

;(async () => {
    for await (const item of systemInfo()) {
        console.log(item)
    }
})()