import { describe, it } from 'mocha'
import { expect } from 'chai'
import { save, databasePath } from '../src/repository.js'
import fs from 'fs/promises'

describe('Test of person repository', function () {
    it('should save data in database file', async function () {
        const data = {
            "id": "2",
            "vehicles": ["Motos", "Cars"],
            "kmTraveled": `${Math.floor(Math.random() * 10000)}`,
            "from": "2002-10-30",
            "to": new Date().toLocaleDateString().split('/').reverse().join('-')
        }
        await save(data)
        const dbContent = await fs.readFile(databasePath)
        const parsedDBContent = JSON.parse(dbContent)
        expect(parsedDBContent).to.deep.include(data)
    })
})