const Product = require('./products.js')
const crypto = require('crypto');

module.exports = class Cart {
    constructor({ at, products }) {
      this.id = crypto.randomUUID()
      this.at = at;
      this.products = this.removeUndefinedProperties(products);
      this.totalPrice = this.getTotalCartPrice(products);
    }

    removeUndefinedProperties(products) {
      const filteredProducts = products
      .filter(product => Boolean(Reflect.ownKeys(product).length))
      .map(product => new Product(product))

      return JSON.parse(JSON.stringify(filteredProducts))
    }

    getTotalCartPrice() {
      return this.products
      .map(product => product.price)
      .reduce((prev, next) => prev + next, 0)
    }
  }
  