'use strict';

const { watch, promises: { readFile } } = require('fs');

class File {
     watch(event, filename) {
         this.showContent(filename)
     }
     async showContent(filename) {
         console.log((await readFile(filename)).toString())
     }
}

const file = new File()

const showContent = () => { 
    console.log('Mocked showContent function')
}

// Will throw an error because this in watch method will be the this of watch fs
// watch(__filename, file.watch)

// Arrow functions don't inherit this so watch method of File class will preserv the this context
// watch(__filename, (event, filename) => file.watch(event, filename))

// With bind we will set which this context a function will inherit
// watch(__filename, file.watch.bind(file))

// With call or apply we can set which this context a function will have

// file.watch.call(file, null, __filename)
// file.watch.apply(file, [null, __filename])

// Rustic example of how to mock a function inside an object with bind, call or apply
// watch(__filename, file.watch.bind({ showContent }))
// file.watch.call({ showContent }, null, __filename)
// file.watch.apply({ showContent }, [null, __filename])

