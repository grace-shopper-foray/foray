const Sequelize = require('sequelize');
const db = require('../db');

const TripOrder = db.define('tripOrder', {
  numberOfGuests: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
});

module.exports = TripOrder;
