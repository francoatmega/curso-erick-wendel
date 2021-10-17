class TextProcessor {

    #content

    constructor(content) {
        this.#content = content;
    }

    extractHirerAndHireData() {
        const matchRegex = /(?<=[CONTRATANTE|CONTRATADA]:\s)[^\s](.*\n.*)$/gmi
        this.#content= this.#content.match(matchRegex)
        return this
    }

    build() {
        return this.#content
    }

}

module.exports = TextProcessor; 