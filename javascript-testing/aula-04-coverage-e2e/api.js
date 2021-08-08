const http = require('http')

const routes = {
    'post /login': async (req, res) => {
        let body
        for await (const chunk of req) body = JSON.parse(chunk)
        if(body.username !== 'John Doe' && body.password !== 'secret') {
            return res.writeHead(401).end('Invalid login')
        }
        return res.writeHead(200).end('Sucess login')
    },
    'get /users': (req, res) => {
        return res.end('Listing a user')
    },
    'post /users': (req, res) => {
        return res.end('Creating a user')
    },
    'put /users': (req, res) => {
        return res.end('Updating a user')
    },
    'default': (req, res) => {
        return res.writeHead(404).end('Route not found')
    }
}

const controller = (req, res) => {
    const { url, method } = req
    const routeIdentifier = `${method.toLowerCase()} ${url}`
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    if(Object.keys(routes).find(item => item === routeIdentifier)) {
        return routes[routeIdentifier](req, res)
    }
    return routes['default'](req, res)
}

const app = http.createServer(controller)

module.exports = app