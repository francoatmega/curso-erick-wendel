import fs from 'fs/promises';

export const databasePath = `${process.cwd()}/database.json`

export async function save(data) {
    const dbContent = await fs.readFile(databasePath)
    const parsedDBContent = JSON.parse(dbContent)
    parsedDBContent.push(data)
    return fs.writeFile(databasePath, JSON.stringify(parsedDBContent, null, 2))
}