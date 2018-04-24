const Sequelize = require('sequelize');
const TripOrder = require('./tripOrder');
const Trip = require('./trip');
const User = require('./user');
const db = require('../db');

const Order = db.define('order', {
  isCheckedOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Order.prototype.totalPrice = () => {
  return TripOrder.findAll({
    where: {
      orderId: this.getDataValue('id')
    }
  }).then(tripOrderArr => {
    return tripOrderArr.reduce((acc, tripOrder) => {
      return acc + tripOrder.price;
    });
  });
};

Order.addTripToOrder = function(tripId, userId, numberOfGuests) {
  return this.findOrCreate({
    where: { userId: userId, isCheckedOut: false },
    include: [Trip, User]
  })
    .spread((order, _) => {
      return TripOrder.create({
        orderId: order.id,
        tripId,
        numberOfGuests
      }).then(() => order);
    })
    .then(order => {
      return Order.findById(order.id, { include: [Trip] });
    })
    .then(order => {
      return order.trips.find(t => t.id === tripId);
    })
    .catch(console.error);
};

module.exports = Order;
