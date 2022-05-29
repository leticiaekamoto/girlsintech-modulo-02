const express = require('express')
const restaurantes = require('../routes/restaurantesRoutes.js')

const routes = (app) =>{
    app.route('/', (req, res)=>{
        res.status(200)
        res.end()
    })

    app.use(
        express.json(),
        restaurantes
    )
}

module.exports = routes