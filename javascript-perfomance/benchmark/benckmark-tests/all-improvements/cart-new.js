const Product = require('../../src/entities/products')
const crypto = require('crypto');

module.exports = class Cart {
    constructor({ at, products }) {
      this.id = crypto.randomUUID()
      this.at = at;
      this.products = this.removeUndefinedProperties(products);
      this.totalPrice = this.getTotalCartPrice(products);
    }

    removeUndefinedProperties(products) {
        const result = [];
        for(const product of products) {
          const keys = Reflect.ownKeys(product)
          if(!keys.length) continue;
          
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

    getTotalCartPrice() {
      let price = 0;
      for(const product of this.products) {
        price += product.price
      }
      return price
    }
  }
  