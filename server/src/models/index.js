const config = require('../config/config')



// const Sequelize = require('sequelize')


// const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
//     host: config.db.host,
//     dialect: config.db.dialect,
//     operatorsAliases: false,
// })

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.')
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err)
//     })


// const User = sequelize.define('users', {
//     firstName: {
//         type: Sequelize.STRING
//     },
//     lastName: {
//         type: Sequelize.STRING
//     }
// })

// // force: true will drop the table if it already exists
// User.sync({ force: true }).then(() => {
//     // Table created
//     return User.create({
//         firstName: 'a',
//         lastName: 'ss'
//     })
// })


// ---------------------------------------------------------------------------------------

// const fs = require('fs')
// const path = require('path')
// const basename = path.basename(__filename)

// fs
//     .readdirSync(__dirname)
//     .filter(file =>
//         (file.indexOf('.') !== 0) &&
//         (file !== basename) &&
//         (file.slice(-3) === '.js'))
//     .forEach(file => {
//         let model = sequelize.import(path.join(__dirname, file))
//         db[model.name] = model
//     })

// Object.keys(db).forEach(function (modelName) {
//     if ("associate" in db[modelName]) {
//         db[modelName].associate(db);
//     }
// })

// db.sequelize = sequelize
// db.Sequelize = Sequelize

// module.exports = db



