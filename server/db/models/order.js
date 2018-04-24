const Sequelize = require('sequelize');
const TripOrder = require('./tripOrder');
const Trip = require('./trip');
const User = require('./user');
const db = require('../db');
const PromoCode = require('./promoCode')

const Order = db.define('order', {
  isCheckedOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  orderTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    get() {
      return this.getDataValue('orderTotal') * 100
    },
    set (value) {
      this.setDataValue('orderTotal', value / 100)
    }
  },
  stripeTokenId: {
    type: Sequelize.STRING
  }
});

Order.prototype.totalPrice = function(promoCode) {
  const self = this
  return TripOrder.findAll({
    where: {
      orderId: self.id
    }
  })
  .then(tripOrderArr => {
   return Promise.all(tripOrderArr.map(tripOrder => {
      return Trip.findById(tripOrder.tripId)
            .then(foundTrip => [foundTrip.price, tripOrder.numberOfGuests])
    }))
  })
  .then(foundTripPrices => foundTripPrices.reduce(((acc, elem) => acc + (elem[0] * elem[1])), 0))
  .then(total => {
    return PromoCode.findOne({
        where: {
          isActive: true,
          name: promoCode
        }
    })
    .then(promo => {
      self.setDataValue('orderTotal', promo.percentage * total / 100)
      self.save()
      return self
    })
  })
}

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
