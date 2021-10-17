const TextProcessor = require('../src/textProcessor')

class TextProcessorFacace {

    #textProcessorData
    
    constructor(data) {
        this.#textProcessorData = new TextProcessor(data)
        .extractHirerAndHireData()
        .splitIntoColumns()
        .stripString()
        .mapPerson()
        .build()
    }

    getPersonsFromPDF() {
        return this.#textProcessorData
    }
}

module.exports = TextProcessorFacace