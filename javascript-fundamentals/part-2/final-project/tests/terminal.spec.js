import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import chalk from 'chalk'
import readline from 'readline'
import Terminal from '../src/terminal.js'
import Person from '../src/person.js'

describe('Test of Terminal class', function () {
    it('should test initialization of terminal', function () {
        const terminal = new Terminal()
        terminal.initTerminal()
        
        expect(terminal.terminal).to.be.instanceOf(readline.Interface)
    })
    it('should test initialization of terminal table', function () {
        const terminal = new Terminal()
        terminal.initTerminal()
        const data = [
            {
              "id": "1",
              "vehicles": [
                "Motorcyle",
                "Car",
                "Truck"
              ],
              "kmTraveled": "9543",
              "from": "2001-10-01",
              "to": "2021-09-24"
            }
          ]
        const spyConsoleDraft = sinon.fake()
        console.draft = spyConsoleDraft
        terminal.initTable(data)
        terminal.closeTerminal()

        expect(terminal.data).to.be.an('array')
        expect(spyConsoleDraft.called).to.be.true
    })
    it('should test update table on terminal', function () {
        const terminal = new Terminal()
        terminal.initTerminal()
        const data = [
            {
              "id": "1",
              "vehicles": [
                "Motorcyle",
                "Car",
                "Truck"
              ],
              "kmTraveled": "9543",
              "from": "2001-10-01",
              "to": "2021-09-24"
            }
          ]
        const person = new Person({ id: 2, vehicles: 'cars', kmTraveled: '37465', from: '2001-01-01', to: '2002-02-02'})
        const spyConsoleDraft = sinon.fake()
        console.draft = spyConsoleDraft
        terminal.initTable(data)
        terminal.updateTable(person.transform())
        terminal.closeTerminal()

        expect(true).to.be.true
        expect(terminal.data).to.be.an('array')
        expect(terminal.data).to.be.lengthOf(2)
    })
    it('should test asking a question on terminal', function () {
        const terminal = new Terminal()
        terminal.initTerminal()
        const spy = sinon.spy(terminal, 'question')
        terminal.question('test')
        terminal.closeTerminal()

        expect(spy.called).to.be.true
        expect(spy.args[0]).to.deep.equal(['test'])
    })
    it('should test asking a question on terminal without a question', function () {
        const terminal = new Terminal()
        terminal.initTerminal()
        const spy = sinon.spy(terminal, 'question')
        terminal.question()
        terminal.closeTerminal()

        expect(spy.called).to.be.true
        expect(spy.args[0]).to.be.an('array').empty
    })
    it('should return table options of terminal', function () {
        const terminal = new Terminal()
        const options = {
            leftPad: 2,
            columns: [
              { field: "id",     name: chalk.cyan("ID") },
              { field: "vehicles",  name: chalk.magenta("Vehicles") },
              { field: "kmTraveled", name: chalk.green("KM Traveled") },
              { field: "from",  name: chalk.yellow("From date") },
              { field: "to",  name: chalk.yellow("To date") }
            ]
          };

        expect(terminal.getTableOptions()).to.be.deep.equal(options)
    })
})