const User = require('./user');
const Trip = require('./trip');
const Order = require('./order');
const TripOrder = require('./tripOrder');
const db = require('../db');

Trip.belongsToMany(Order, { through: TripOrder });
Order.belongsToMany(Trip, { through: TripOrder });

Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
  User,
  Trip,
  Order,
  TripOrder,
  db
};
