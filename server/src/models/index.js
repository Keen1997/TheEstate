const config = require('../config/config')
const pg = require('pg')

const con = new pg.Pool(config.db)

require('./estates')(con)

module.exports = con
