const Sequelize = require('sequelize');
const TripOrder = require('./tripOrder');
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

Order.prototype.totalPrice = (promoCode) => {
  return TripOrder.findAll({
    where: {
      orderId: this.getDataValue('id')
    }
  }).then(tripOrderArr => {
    return tripOrderArr.reduce((acc, tripOrder) => {
      return acc + tripOrder.price;
    })
  })
  .then(total => {
    return PromoCode.findOne({
        where: {
          name: promoCode,
          isActive: true
        }
    })
    .then(promo => {
      this.setDataValue('orderTotal', promo.percentage * total)
      return promo.percentage * total
    })
  })
}

module.exports = Order;
