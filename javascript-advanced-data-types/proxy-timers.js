const Event = require('events')
const eventObj = new Event()
eventObj.on('increment', (counter) => { console.log('Value ', counter) })

const myCounter = {
    counter: 0 
}

const proxy = new Proxy(myCounter, {
    set: (target, property, value) => {
        eventObj.emit('increment', value)
        target[property] = value
        return
    }
})

// Calls the callback function at the given time, until the end of execution of script or when clearInterval
// is called
setInterval(() => {
    proxy.counter += 1
}, 100)

// Execute the callback function as early as possible
setImmediate(() => {
    proxy.counter = 5
})

// Execute the callback function after the given timeout
setTimeout(() => {
    proxy.counter = 6  
}, 0)

// Break the event loop and imediatly execute the callback function
// Bad practice
process.nextTick(() => {
    proxy.counter = 7
})

// The order of priority is nextTick > setTimeout > setImediate
