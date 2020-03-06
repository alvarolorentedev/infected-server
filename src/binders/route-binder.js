const express = require('express')
function routeBinder(app){
    app.use('/example', require('../routes/example'))
    app.use(express.static('public'))
}

module.exports = routeBinder
