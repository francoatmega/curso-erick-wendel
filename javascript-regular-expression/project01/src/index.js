'use strict';

const { readFile } = require('fs/promises')
const { join } = require('path')
const PdfParse = require('pdf-parse')
const TextProcessorFacade = require('./textProcessorFacade')

;(async () => {
    const data = await readFile(join(__dirname, '../docs/contrato.pdf'))
    const parsedData = await PdfParse(data)
    const persons = new TextProcessorFacade(parsedData.text).getPersonsFromPDF()
    console.log(persons)
})();