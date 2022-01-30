const { v4: uuid } = require('uuid');

module.exports = class Cart {
    constructor() {
      this.id = uuid()
    }
}