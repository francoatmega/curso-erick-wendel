const { csvToJSON } = require('./readFile');
const assert = require('assert');

(async () => {
    {
        assert.rejects(csvToJSON('../mocks/emptyFile-invalid.csv'), /Invalid headers/)
    }
    {
        assert.rejects(csvToJSON('../mocks/fourItems-invalid.csv'), /Invalid number os lines. Lines more than 3/)
    }
    {
        const parsedFile = await csvToJSON('../mocks/threeItems-valid.csv')
        const expectedParsedFile = [
            {
              "id": "1",
              "name": "Jardel",
              "profession": "Programador",
              "age": "26"
            },
            {
              "id": "2",
              "name": "Jayslanio",
              "profession": "Médico",
              "age": "31"
            },
            {
              "id": "3",
              "name": "Jarismencia",
              "profession": "Enfermeira",
              "age": "42"
            }
          ]
        assert.deepStrictEqual(parsedFile, expectedParsedFile)
    }
})()