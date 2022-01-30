const Benchmark = require('benchmark');
const Remove_Property_Func = require('./cart-remove-property-functional');
const Remove_Propert_Struc = require('./cart-remove-property-strutured');

const suite = new Benchmark.Suite;

suite
    .add('Remove_Property_Func', function () {

        const products = [
            {
                a: '1',
                b: undefined,
                c: undefined,
                ddd: undefined,
                e: 'test',
                f: () => {}
            }
        ]

        new Remove_Property_Func({ products })
    })
    .add('Remove_Propert_Struc', function () {

        const products = [
            {
                a: '1',
                b: undefined,
                c: undefined,
                ddd: undefined,
                e: 'test',
                f: () => {}
            }
        ]

        new Remove_Propert_Struc({ products })
    })
    .on('cycle', function (event) {
        console.log(String(event.target))
    })
    .on('complete', function() {
        console.log(`The fastest implementation is ${this.filter('fastest').map('name')}`)
    })
    .run({ async: true })