const Benchmark = require('benchmark');
const CartUUID_Crypto = require('./cart-uuid-crypto.js');
const CartUUID_NPM = require('./cart-uuid-npm.js');

const suite = new Benchmark.Suite;

suite
    .add('CartUUID_NPM', function () {
        new CartUUID_NPM()
    })
    .add('CartUUID_Crypto', function () {
        new CartUUID_Crypto()
    })
    .on('cycle', function (event) {
        console.log(String(event.target))
    })
    .on('complete', function() {
        console.log(`The fastest implementation is ${this.filter('fastest').map('name')}`)
    })
    .run()