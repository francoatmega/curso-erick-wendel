const safeRegex = require('safe-regex');

class UnsafeRegexError extends Error {
    constructor(regex) {
        super(`${regex} is unsafe!`)
        this.name = 'UnsafeRegexError'
    }
}  

const evaluateRegex = (regex) => {
    if(!safeRegex(regex)) throw new UnsafeRegexError(regex)
    return regex
}

module.exports = { evaluateRegex, UnsafeRegexError }