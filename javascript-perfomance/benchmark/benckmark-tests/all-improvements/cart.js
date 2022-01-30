const Benchmark = require('benchmark');
const CartOld = require('./cart-old');
const CartNew = require('./cart-new');

const database = require('../../database')

const suite = new Benchmark.Suite;

suite
    .add('CartOld', function () {
        new CartOld(database)
    })
    .add('CartNew', function () {
        new CartNew(database)
    })
    .on('cycle', function (event) {
        console.log(String(event.target))
    })
    .on('complete', function() {
        console.log(`The fastest implementation is ${this.filter('fastest').map('name')}`)
    })
    .run()