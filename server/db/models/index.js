const User = require('./user')
const Trip = require('./trip')
const Order = require('./order')
const TripOrder = require('./tripOrder')
const db = require('../db')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 *
 */

// Order.belongsTo(User)
// User.hasMany(Order)

// Trip.belongsToMany(Order)
// Order.hasMany(Trip)
Trip.belongsToMany(Order, { through: TripOrder })

Order.hasMany(Trip) // should only be used for one-to-many

Order.belongsTo(User)
User.hasMany(Order)

module.exports = {
  User,
  Trip,
  Order,
  TripOrder,
  db
}
