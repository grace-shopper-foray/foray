const Sequelize = require('sequelize')
const db = require('../db')


const Trip = db.define('trip', {
    moonName: {
        type: Sequelize.STRING
    }
})

module.exports = Trip
