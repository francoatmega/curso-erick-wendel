const faker = require('faker')
const Car = require('../models/car')
const CarCategory = require('../models/carCategory')
const Customer = require('../models/customer')
const { join } = require('path')
const { writeFile } = require('fs/promises')

const seederBaseFolder = join(__dirname, '../', "data")
const MAX_ITEMS_SEEDERS = 3

const carsCategory = []
const cars = []
const customers = []

const newCarCategory = new CarCategory({
    id: faker.datatype.uuid(),
    name: faker.vehicle.type(),
    carsIds: [],
    price: faker.finance.amount(60000, 150000)
})

carsCategory.push(newCarCategory)

for(let index=0; index < MAX_ITEMS_SEEDERS; index++) {
    const newCar = new Car({
        id: faker.datatype.uuid(),
        name: faker.vehicle.model(),
        releaseYear: faker.date.past().getFullYear(),
        available: true,
        gasAvailable: true
    })
    carsCategory[0].carsIds.push(newCar.id)
    cars.push(newCar)

    const newCustomer = new Customer({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        age: faker.datatype.number({ min: 18, max: 50 })
    })
    customers.push(newCustomer)
}

;(async () => {
    await writeFile(`${seederBaseFolder}/cars.json`, JSON.stringify(cars, null, ' '))
    await writeFile(`${seederBaseFolder}/carsCategory.json`, JSON.stringify(carsCategory, null, ' '))
    await writeFile(`${seederBaseFolder}/customers.json`, JSON.stringify(customers, null, ' '))
})()