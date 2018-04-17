const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('order', {
    numberOfGuests: {
        type: Sequelize.INTEGER,
        min: 1
    }
})


module.exports = {
    Order
}

