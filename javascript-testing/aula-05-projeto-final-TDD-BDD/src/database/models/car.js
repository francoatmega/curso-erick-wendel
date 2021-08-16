
class Car {
    constructor({ id, name, releaseYear, available, gasAvailable }) {
        this.id = id;
        this.name = name;
        this.releaseYear = releaseYear;
        this.available = available;
        this.gasAvailable = gasAvailable;
    }
}

module.exports = Car