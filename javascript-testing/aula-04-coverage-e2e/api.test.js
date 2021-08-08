const { describe, it } = require('mocha');
const request = require('supertest')
const app = require('./api')
const { deepStrictEqual } = require('assert');

describe('API tests', () => {
    describe('get /users', () => {
        it('should request get users route and return http 200 status code', async () => {
            const response = await request(app).get('/users')
            deepStrictEqual(response.statusCode, 200)
            deepStrictEqual(response.text, 'Listing a user')
        })
    })

    describe('get /no-existent-route', () => {
        it('should request unexistent route and return http status 404', async () => {
            const response = await request(app).get('/non-existent-route')
            deepStrictEqual(response.statusCode, 404)
            deepStrictEqual(response.text, 'Route not found')
        })
    })

    describe('post /users', () => {
        it('should request post user route and return http status 200', async () => {
            const response = await request(app).post('/users')
            deepStrictEqual(response.statusCode, 200)
            deepStrictEqual(response.text, 'Creating a user')
        })
    })

    describe('put /users', () => {
        it('should request put user route and return http status 200', async () => {
            const response = await request(app).put('/users')
            deepStrictEqual(response.statusCode, 200)
            deepStrictEqual(response.text, 'Updating a user')
        })
    })

    describe('post /login', () => {
        it('should validate user when pass right credentials', async () => {
            const response = await request(app).post('/login').send({ username: 'John Doe', password: 'secret' })
            deepStrictEqual(response.statusCode, 200)
            deepStrictEqual(response.text, 'Sucess login')
        })
    })

    describe('post /login', () => {
        it('should forbidden user when pass wrong credentials', async () => {
            const response = await request(app).post('/login').send({ username: 'Eric Northman', password: '123456' })
            deepStrictEqual(response.statusCode, 401)
            deepStrictEqual(response.text, 'Invalid login')
        })
    })
})