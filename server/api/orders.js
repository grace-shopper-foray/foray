const router = require('express').Router()
const { TripOrder, Order, Trip, User } = require('../db/models')

// Get a specific order.

function userValid(req, res, next) {
  User.findById(req.session.passport.user)
    .then(user => {
      if (user.isAdmin) next()
      else res.sendStatus(401)
    })
    .catch(next)
}

router.get('/:orderId', (req, res, next) => {
  // userValid(req, res, next)
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
    //.then(userValid(req, res, next))
    .then(order => res.json(order))
    .catch(err => {
      res.status(404).send('Not Found')
      next(err)
    })
})

module.exports = router

// .then(userValid(req, res, next)
