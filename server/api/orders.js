const router = require('express').Router();
const { Order, Trip, User } = require('../db/models');
const stripe = require('stripe')('sk_test_YJIPtZSqDVixu3EYQRJkAoWI');

// Check logged in user is the one requesting.
function isLoginUser(req, res, next) {
  const userId = req.params.userId;
  let loggedInUser;
  if (req.session.passport) loggedInUser = req.session.passport.user;
  if (userId === 'undefined' || +userId === +loggedInUser) next();
  else {
    res.sendStatus(401);
  }
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

router.post('/', (req, res, next) => {
  const token = req.body.stripeToken;
  const promoCode = req.body.promoCode;
  const arrayTrips = req.session.cart.trips;
  let subTotal = arrayTrips.reduce((prev, curr) => {
    return +prev + +curr.price * curr.tripOrder.numberOfGuests;
  }, 0);
  Order.create({
    isCheckedOut: true,
    stripeTokenId: req.body.stripeToken,
    orderTotal: subTotal,
    userId: null
  })
    // .then(order => order.totalPrice(promoCode))
    .then(updatedOrder =>
      stripe.charges.create({
        amount: updatedOrder.orderTotal,
        currency: 'usd',
        description: 'Guest checkout',
        source: token
      })
    )
    .then(data => res.status(201).json(data))
    .catch(next);
});

module.exports = router;
