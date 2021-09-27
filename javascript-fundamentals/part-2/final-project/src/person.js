export default class Person {
    constructor({ id, vehicles, kmTraveled, from, to }) {
        this.id = id
        this.vehicles = vehicles
        this.kmTraveled = kmTraveled, 
        this.from = from, 
        this.to = to
    }

    transform(language = 'pt-Br') {
        return  {
            id: Number(this.id),
            vehicles: new Intl
                .ListFormat(language, { style: 'long', type: 'conjunction' })
                .format(this.vehicles),
            kmTraveled: new Intl
                .NumberFormat(language, { style: 'unit', unit: 'kilometer'})
                .format(this.kmTraveled),
            from: new Intl
                .DateTimeFormat(language, { month: 'long', day: '2-digit', year: 'numeric'})
                .format(new Date(this.from)),
            to: new Intl
                .DateTimeFormat(language, { month: 'long', day: '2-digit', year: 'numeric'})
                .format(new Date(this.to))
        }
    }

    static fromString(string) {
        const [ id, vehicles, kmTraveled, from, to ] = string.split(' ')
        const personFromString = {
            id, 
            vehicles: vehicles.split(','), 
            kmTraveled, 
            from, 
            to
        }
        return new Person(personFromString)
    }
}