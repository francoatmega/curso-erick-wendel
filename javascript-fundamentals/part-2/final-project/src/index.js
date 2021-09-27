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
    const answer = await terminal.question('Please, type yoru data: ')
    if(answer === QUIT_TERMINAL) terminal.closeTerminal()
    const person = Person.fromString(answer)
    console.log(person.transform())
  } catch (err) {
    console.log(chalk.inverse.red('Error: ', err.message))
  } finally {
    return mainLoop()
  }
}

await mainLoop()
