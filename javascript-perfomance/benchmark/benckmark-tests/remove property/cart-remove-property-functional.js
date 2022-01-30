const Product = require('../../src/entities/products')

module.exports = class Cart {
    constructor({ products }) {
      this.products = this.removeUndefinedProperties(products);
    }

    removeUndefinedProperties(products) {
      const filteredProducts = products
      .filter(product => Boolean(Reflect.ownKeys(product).length))
      .map(product => new Product(product))

      return JSON.parse(JSON.stringify(filteredProducts))
    }
  }
  