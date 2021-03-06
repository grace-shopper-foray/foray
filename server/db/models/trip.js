const Sequelize = require('sequelize')
const db = require('../db')

const Trip = db.define('trip', {
  moonName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  planetName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('price') * 100
    },
    set(value) {
      return this.setDataValue('price', value) / 100
    },
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  numberOfNights: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imagePath: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

Trip.getTripDetail = function(tripId) {
  return this.findById(tripId)
    .then(trip => trip)
    .catch(console.error)
}

module.exports = Trip
