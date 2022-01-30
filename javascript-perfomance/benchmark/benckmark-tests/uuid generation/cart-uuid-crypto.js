const { randomUUID } = require('crypto');

module.exports = class Cart {
    constructor() {
      this.id = randomUUID()
    }
}