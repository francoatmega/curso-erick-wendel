const Product = require('../../src/entities/products')

module.exports = class Cart {
    constructor({ products }) {
      this.products = this.removeUndefinedProperties(products);
    }

    removeUndefinedProperties(products) {
      const result = [];
      for(const product of products) {
        const keys = Reflect.ownKeys(product)
        if(!keys.length) continue;

        // First option
        // keys.forEach(key => products[key] || Reflect.deleteProperty(product, key))

        // Second option
        // keys.forEach(key => products[key] || delete products[key])
        
        // Third option
        let newObject = {}
        keys.forEach(key => {
          if( product[key] ) {
            newObject[key] = keys[key]
          }
        })

        result.push(new Product(newObject))
      }
      return result;
    }
  }
  