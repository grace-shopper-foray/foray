const User = require('./user')
const Trip = require('./trip')
const Order = require('./order')
const TripOrder = require('./tripOrder')
const db = require('../db')
const PromoCode = require('./promoCode')

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 *
 **/

Trip.belongsToMany(Order, { through: TripOrder })
Order.belongsToMany(Trip, { through: TripOrder })

Order.belongsTo(User)
User.hasMany(Order)

module.exports = {
  User,
  Trip,
  Order,
  TripOrder,
  PromoCode,
  db
}
