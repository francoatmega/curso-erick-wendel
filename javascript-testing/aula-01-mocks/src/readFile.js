const { readFile } = require('fs/promises')
const { join } = require('path')
const DEFAULT_OPTIONS = {
    maxLines: 3,
    headers: [  "id", "name", "profession", "age" ]
}

exports.csvToJSON = async (filePath) => {
    const content = await getFileContent(filePath)
    const validation = isValid(content)
    if(!validation.valid) throw new Error(validation.message)
    return parseCSVToJSON(content)
}

const getFileContent = async (filePath) => {
    const fileName = join(__dirname, filePath)
    const fileContent = (await readFile(fileName)).toString()
    return fileContent
}

const isValid = (csvString, options = DEFAULT_OPTIONS) => {
    const [ headers, ...lines ] = csvString.split('\n')
    if (!options.headers.every(item => headers.includes(item))) {
        return { 
            message: 'Invalid headers',
            valid: false
        }
    }
    if (lines.length > 3) {
        return { 
            message: 'Invalid number os lines. Lines more than 3',
            valid: false
        }
    }
    return { 
        message: 'Valid file',
        valid: true
    }
}

const parseCSVToJSON = (csvString) => {
    const [headers, ...lines] = csvString.split('\n')
    const splittedHeaders = headers.split(',')
    return lines.map(item => {
      const splittedLine = item.split(',')
      const parsedLine = {}
      for (let index = 0; index < splittedHeaders.length; index++) {
          parsedLine[splittedHeaders[index].trim()] = splittedLine[index].trim().toString();
      }
      return parsedLine
    })
}
