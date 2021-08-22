const { readFile } = require('fs/promises')
const { join } = require('path')

const seederBaseFolder = join(__dirname, '../', "data")

exports.find = async (modelName, id) => {
    const content = JSON.parse(await readFile(`${seederBaseFolder}/${modelName}.json`))
    if (!id) return content
    return content.find(item => item.id === id)
}