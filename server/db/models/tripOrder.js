const Sequelize = require('sequelize')
const Trip = require('./trip')
const db = require('../db')


const TripOrder = db.define('tripOrder', {
    numberOfGuests: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
    total: {
        type: Sequelize.VIRTUAL,
        get() {
            // try to avoid having this resolve to a promise
            // use a defaultScope and eager load the trip
            return Trip.findById(this.getDataValue('tripId'))
                    .then(trip => {
                        return trip.pricePerTrip * this.getDataValue('numberOfGuests')
                    })
        }
    }
})

module.exports = TripOrder

