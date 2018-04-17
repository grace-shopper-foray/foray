const Sequelize = require('sequelize')
const TripOrder = require('./tripOrder')
const db = require('../db')


const Order = db.define('order', {
    isCheckedOut: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

Order.prototype.totalPrice = () => {
    return TripOrder.findAll({
        where: {
            orderId: this.getDataValue('id')
        }
    })
    .then((tripOrderArr) => {
        return tripOrderArr.reduce((acc, tripOrder) => {
                return acc + tripOrder.pricePerTrip
        })
    })
}

module.exports = Order
