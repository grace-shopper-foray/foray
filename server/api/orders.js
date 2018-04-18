const router = require('express').Router()
const { TripOrder, Order } = require('../db/models')

// User wants to see OrderHistory.

// router.get('/:userId', (req, res, next) => {
//   const isActive = (req.query.cart === 'active')
//   if (req.query.cart !== undefined) { // There is a query string for cart
//     Order.findAll({
//       where: {
//         userId: req.params.userId,
//         isActive: isActive
//       }
//     })
//     .then(orders => res.json(orders))
//     .catch(next)
//   } else { // No query value, return all orders for user.
//     Order.findAll({
//       where: {
//         userId: req.params.userId,
//       }
//     })
//     .then(orders => res.json(orders))
//     .catch(err => {
//       res.status(404).send('Not Found');
//       next(err);
//     });
//   }
// f})

// Get a specific order.

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
    .then(order => {
      if (req.user.id === order.user.id || req.user.isAdmin) {
        res.json(order)
      } else {
        res.sendStatus(401);
      }
    })
    .catch(err => {
      res.status(404).send('Not Found');
      next(err);
    });
})

// Create a new order, i.e. user adds trip to cart.

router.post('/', (req, res, next) => {
  const { userId, tripId, numberOfGuests } = req.body
  Order.create({
    userId
  }).then(order => {
    return TripOrder.create({
      numberOfGuests, tripId,
      orderId: order.id
    })
  }).catch(next)
})

module.exports = router
