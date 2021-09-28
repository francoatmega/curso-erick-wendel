import readline from 'readline'
import Person from './person.js'
import draftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'

export default class Terminal {

    constructor() {
        this.print = {}
        this.data = {}
        this.terminal = {}
    }

    initTerminal() {
        draftLog.into(console)
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }

    initTable(database, language) {
        this.data = database.map(val => new Person(val).transform(language))
        this.print = chalkTable(
            this.getTableOptions(), 
            this.data
        )
        console.draft(this.print)
    }

    updateTable(item) {
        this.data.push(item)
        this.print = chalkTable(
            this.getTableOptions(), 
            this.data
        )
        console.draft(this.print)
    }

    getTableOptions() {
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
        return options
    }

    question(message = '') {
        return new Promise(resolve => this.terminal.question(message, resolve))
    }

    closeTerminal() {
        this.terminal.close()
    }
}