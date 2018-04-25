const router = require('express').Router();
const { TripOrder, Order, Trip, User } = require('../db/models');
const stripe = require('stripe')('sk_test_YJIPtZSqDVixu3EYQRJkAoWI')



// Only admin can view it
function isLoginUser(req, res, next) {
  if (!req.user) res.sendStatus(401);
  else next();
}

// Get a specific order.
router.get('/:orderId', isLoginUser, (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: [
      {
        model: Trip
      },
      {
        model: User
      }
    ]
  })
    .then(order => {
      if (
        +order.userId === +req.user.dataValues.id ||
        req.user.dataValues.isAdmin
      ) {
        res.json(order);
      } else {
        res.sendStatus(401);
      }
    })
    .catch(err => {
      res.status(404).send('Not Found');
      next(err);
    });
});


router.post('/orders', (req, res, next) => {
  const token = req.body.stripeToken
  const promoCode = req.body.promoCode
  Order.create({
    isCheckedOut: true,
    stripeTokenId: req.body.stripeTokenId,
    orderTotal: null
  })
  .then(order => order.totalPrice(promoCode))
  .then(updatedOrder =>
    stripe.charges.create({
      amount: updatedOrder.orderTotal,
      currency: 'usd',
      description: 'Guest checkout',
      source: token
    })
  )
  .then(data => res.status(201).json(data))
  .catch(next)
})

module.exports = router;
