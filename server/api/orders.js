const router = require('express').Router()
const { TripOrder, Order, Trip, User } = require('../db/models')

// Get a specific order.

router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: [{
      model: Trip
    }, {
      model: User
    }]
  })
    .then(order => res.json(order))
    .catch(err => {
      res.status(404).send('Not Found');
      next(err);
    });
})

module.exports = router
