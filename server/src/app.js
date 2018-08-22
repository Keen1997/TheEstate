const config = require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const validator = require('express-validator')

process.env.NODE_ENV = config.env
console.log('env: ' + process.env.NODE_ENV)

const app = express()

if (process.env.NODE_ENV == 'development') app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(validator())

const con = require('./models')

con.connect(function(error) {
    if (error) console.log(error)
    else console.log('database connected')
})

require('./routes')(app)

app.listen(config.port, () => {
    console.log('Server Started at port ' + config.port)
})

