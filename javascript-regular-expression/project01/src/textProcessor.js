const { evaluateRegex } = require('../src/helpers')
class TextProcessor {

    #content

    constructor(content) {
        this.#content = content;
    }

    extractHirerAndHireData() {
        const matchRegex = evaluateRegex(/(?<=[CONTRATANTE|CONTRATADA]:\s)[^\s](.*\n.*)$/gmi)
        this.#content= this.#content.match(matchRegex)
        return this
    }

    splitIntoColumns() {
        const splitRegex = evaluateRegex(/,/)
        this.#content = this.#content.map(item => item.split(splitRegex))
        return this
    }

    stripString() {
        const trimSpacesAndBreakLines = evaluateRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map(person => person.map(line => line.replace(trimSpacesAndBreakLines, '')))
        return this
    }

    build() {
        return this.#content
    }

}

module.exports = TextProcessor; 