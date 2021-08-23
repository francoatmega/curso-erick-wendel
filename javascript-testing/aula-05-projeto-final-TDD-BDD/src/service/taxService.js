
exports.getTaxByAge = (age) => {
    if(age >= 18 && age <= 25) return 1.1
    if(age >= 26 && age <= 30) return 1.5
    if(age >= 31 && age <= 99) return 1.3
    throw new Error('Invalid age')
}

exports.formatCurrency = (amount) => Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
}).format(amount)

exports.calculateRetingPrice = (carCategory, customerAge, retingDays) => {
     const { price } = carCategory
     const retingPrice = (price * this.getTaxByAge(customerAge) * retingDays)
     return this.formatCurrency(retingPrice)
}