const baseRepository = require('../database/repository/baseRepository')

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