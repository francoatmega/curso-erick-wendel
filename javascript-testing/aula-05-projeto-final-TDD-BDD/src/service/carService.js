const baseRepository = require('../database/repository/baseRepository')
const taxService = require('../service/taxService')

exports.getRandomIndex = (list) => {
    const listLength = list.length
    return Math.floor(Math.random() * listLength)
}

exports.chooseRandomCar = (carCategory) => {
    const randomCarIndex = this.getRandomIndex(carCategory.carsIds)
    const carId = carCategory.carsIds[randomCarIndex]
    return carId
}

exports.getAvailableCar = async (carCategory) => {
    const carId = this.chooseRandomCar(carCategory)
    const car = await baseRepository.find('cars', carId)
    return car
}

exports.rent = async (customer, carCategory, numberOfDays) => {
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = taxService.calculateRetingPrice(carCategory, customer.age, numberOfDays)
    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)
    const dueDate = today.toLocaleDateString('pt-br', {
        year: 'numeric', month: 'long', day: 'numeric'
    })
    return {
        customer,
        car,
        dueDate,
        amount: finalPrice
    }
}