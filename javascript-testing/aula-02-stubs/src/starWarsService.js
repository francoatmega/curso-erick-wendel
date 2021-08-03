const https = require('https');

const BASE_URL_STARSWARS_API = "https://swapi.dev/api/"

const getPlanetById = (planetId) => {
    return new Promise((resolve, reject) => {
        https.get(`${BASE_URL_STARSWARS_API}/planets/${planetId}`, response => {
            response.on('data', data => resolve(JSON.parse(data)))
            response.on('error', reject)
        })
    })
}

module.exports = { getPlanetById }