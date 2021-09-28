import db from '../database.json' 
import chalk from 'chalk'
import Terminal from './terminal.js' 
import Person from './person.js'

const LANGUAGE = 'pt-Br'
const QUIT_TERMINAL = ':q'

const terminal = new Terminal()

terminal.initTerminal()
terminal.initTable(db, LANGUAGE)

const mainLoop = async () => {
  try {
    const answer = await terminal.question('Please, type your data: ')
    if(answer === QUIT_TERMINAL) return terminal.closeTerminal()
    const person = Person.fromString(answer)
    terminal.updateTable(person.transform())
  } catch (err) {
    console.log(chalk.inverse.red('Error: ', err.message))
    return mainLoop()
  }
}

await mainLoop()
