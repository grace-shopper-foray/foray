const router = require('express').Router()
const { User, Order, TripOrder, Trip } = require('../db/models')
module.exports = router

//check admin middleware

// OH: I love this, but use it throughout!
function isAdmin(req, res, next) {
  User.findById(req.session.passport.user).then(user => {
    if (user.isAdmin) next()
    else res.sendStatus(401)
  })
}

// Getting a list of all users.
// Requires Admin Permission
router.get('/', isAdmin, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields
    attributes: ['id', 'email']
  })
    .then(users => {
      console.log(users)
      res.json(users)
    })
    .catch(next)
})

// Find a single user

// OH: The below should only be accessible by admin or logged in user. Many other routes
// should also be accessible to only one or both of these, not anyone.
// I.E. I should not be able to hit any of these routes as a non-admin user,
// a different user, or a guest. Use the isAdmin function above, and make one
// to check current user and implement either/or/both where appropriate.
router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId, {
    attributes: ['id', 'firstName', 'lastName', 'email']
  })
    .then(user => res.json(user))
    .catch(next)
})

// Creating new user

router.post('/', (req, res, next) => {
  const { firstName, lastName, phoneNumber, email } = req.body
  User.create({
    firstName,
    lastName,
    email,
    phoneNumber
  })
    .then(user => {
      res.status(201).send(user)
    })
    .catch(next)
})

// Updating a users information.

router.put('/:userId', (req, res, next) => {
  const id = req.params.userId
  User.findById(id).then(user => {
    return user
      .update(req.body)
      .then(updatedUser => {
        res.status(200).json(updatedUser)
      })
      .catch(next)
  })
})

// Removes a user from the database

router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId
  User.findById(id)
    .then(user => user.destroy())
    .then(() => {
      res.status(204).send('No content')
    })
    .catch(next)
})

// User adds trip to cart.

router.post('/:userId/orders', (req, res, next) => {
  const userId = req.params.userId
  const { tripId, numberOfGuests } = req.body

  Order.findOrCreate({
    where: { userId: userId, isCheckedOut: false },
    include: [Trip, User]
  })
    .spread((order, _) => {
      return TripOrder.create({
        orderId: order.id,
        tripId,
        numberOfGuests
      }).then(() => order)
    })
    .then(order => {
      return Order.findById(order.id, { include: [Trip] })
    })
    .then(order => {
      const trip = order.trips.filter(t => t.id === tripId)[0]
      res.status(201).json(trip)
    })
    .catch(next)
})

// User wants to update the number of guests on an item in cart

router.put('/:userId/orders', (req, res, next) => {
  const userId = req.params.userId
  const { tripId, numberOfGuests } = req.body
  Order.findOne({
    where: { userId: userId, isCheckedOut: false },
    include: [Trip, User]
  })
    .then(order => {
      // TripOrder only exists on trip objects, need to filter to trip with tripId
      const tripOrder = order.trips.filter(t => t.id === tripId)[0].tripOrder
      return tripOrder.update({ orderId: order.id, tripId, numberOfGuests })
    })
    .then(trip => res.status(200).json(trip))
    .catch(next)
})

// User wants to checkout the cart
router.put(`/:userId/orders/checkout`, (req, res, next) => {
  const { userId } = req.params
  Order.findOne({ where: { userId, isCheckedOut: false } })
    .then(order => order.update({ isCheckedOut: true }))
    .then(order => res.status(201).json(order))
    .catch(next)
})

// User wants to delete a trip from the cart

router.delete('/:userId/orders', (req, res, next) => {
  const userId = req.params.userId
  const { tripId } = req.body
  Order.findOne({
    where: { userId: userId, isCheckedOut: false },
    include: [Trip, User]
  })
    .then(order => {
      // TripOrder only exists on trip objects, need to filter to trip with tripId
      const tripOrder = order.trips.filter(t => t.id === tripId)[0].tripOrder
      return tripOrder.destroy()
    })
    .then(trip => res.status(204).json(trip))
    .catch(next)
})

// User wants to remove a trip from the cart.
// router.delete(`api/users/${userId}/${tripId}`)
//  destroy return 1 , therefore send {message : successful} back to thunk

router.delete(`/:userId/:tripId`, (req, res, next) => {
  const { userId, tripId } = req.params
  Order.findOne({ where: { userId, isCheckedOut: false } })
    .then(order => TripOrder.destroy({ where: { orderId: order.id, tripId } }))
    .then(() => res.status(204).json({ message: 'successful' }))
    .catch(next)
})

// User wants to see Order history or cart (/orders?cart=active).

router.get('/:userId/orders', (req, res, next) => {
  const isActive = req.query.cart === 'active'
  if (req.query.cart !== undefined) {
    // Non-Checkout Order in Cart
    // There is a query string for cart
    Order.findOne({
      where: {
        userId: req.params.userId,
        isCheckedOut: !isActive
      },
      include: [Trip, User]
    })
      .then(order => {
        res.json(order)
      })
      .catch(next)
  } else {
    // No query value, return all orders for user.
    // same as orders.js?
    Order.findAll({
      where: {
        userId: req.params.userId,
        isCheckedOut: true
      },
      include: [Trip, User]
    })
      .then(orders => res.json(orders))
      .catch(err => {
        res.status(404).send('Not Found')
        next(err)
      })
  }
})
