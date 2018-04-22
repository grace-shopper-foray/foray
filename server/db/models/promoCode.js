const Sequelize = require('sequelize')
const db = require('../db')

const PromoCode = db.define('promoCode', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  percentage: {
    type: Sequelize.INTEGER,
    defaultValue: 10,
    allowNull: false
  }
})

module.exports = PromoCode
