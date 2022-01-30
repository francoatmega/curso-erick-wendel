const database =  require('../database.js');
const Cart = require('./entities/cart');

const cart = new Cart(database)

console.log(cart)