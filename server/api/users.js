const router = require('express').Router()
const { User, Order, TripOrder, Trip } = require('../db/models')
const stripe = require('stripe')('sk_test_YJIPtZSqDVixu3EYQRJkAoWI')

module.exports = router

//check admin middleware
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
      res.json(users)
    })
    .catch(next)
})

// Find a single user

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
  const { firstName, lastName, password, email, phoneNumber } = req.body
  const id = req.params.userId
  User.findById(id)
    .then(user =>
      user.update({ firstName, lastName, password, email, phoneNumber })
    )
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(next)
})

// Removes a user from the database

router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId
  User.findById(id)
    .then(user => user.destroy())
    .then(() => {
      res.status(204).end()
    })
    .catch(next)
})

// User adds trip to cart.

router.post('/:userId/orders', (req, res, next) => {
  const userId = req.params.userId
  const { tripId, numberOfGuests } = req.body

  if (userId !== 'undefined') {
    Order.addTripToOrder(tripId, userId, numberOfGuests)
      .then(trip => res.status(200).json(trip))
      .catch(next)
  } else {
    let cart = req.session.cart
    // tripId, numberOfGuests
    if (!cart.trips[0].id) {
      //first time adding to cart
      Trip.getTripDetail(tripId).then(result => {
        let tripOrder = {
          numberOfGuests,
          tripId
        }
        let tripDetail = result.dataValues
        tripDetail.tripOrder = tripOrder
        cart = {
          orderId: null,
          trips: [tripDetail],
          isCheckout: false,
          stripeTokenId: null,
          orderTotal: 0
        }
        req.session.cart = cart
        res.status(200).json(tripDetail)
      })
    } else {
      // add more item to cart
      Trip.getTripDetail(tripId).then(result => {
        let tripOrder = {
          numberOfGuests,
          tripId
        }
        let tripDetail = result.dataValues
        tripDetail.tripOrder = tripOrder
        cart.trips.push(tripDetail)
        res.status(200).json(tripDetail)
      })
    }
  }

  // cart[tripId] = numberOfGuests
  // let newCart = Object.assign({}, cart, { [tripId]: cart[tripId] })
  // res.status(200).json({ order: { [tripId]: cart[tripId] } })
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
      const tripOrder = order.trips.find(t => t.id === tripId).tripOrder
      return tripOrder.update({ numberOfGuests })
    })
    .then(trip => res.status(200).json(trip))
    .catch(next)
})

// User wants to checkout the cart
router.put(`/:userId/orders/checkout`, (req, res, next) => {
  const token = req.body.stripeToken
  const promoCode = req.body.promoCode
  //requires promocode to be passed in
  const { userId } = req.params
  Order.findOne({ where: { userId, isCheckedOut: false } })
    .then(order =>
      order.update({
        isCheckedOut: true,
        stripeTokenId: req.body.stripeTokenId
      })
    )
    .then(order => order.totalPrice(promoCode))
    .then(updatedOrder =>
      stripe.charges.create({
        amount: updatedOrder.orderTotal,
        currency: 'usd',
        description: 'Example charge',
        source: token
      })
    )
    .then(data => res.status(201).json(data))
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
    .then(trip => res.status(200).json(trip))
    .catch(next)
})

// User wants to remove a trip from the cart.
// router.delete(`api/users/${userId}/${tripId}`)
//  destroy return 1 , therefore send {message : successful} back to thunk

router.delete(`/:userId/:tripId`, (req, res, next) => {
  const { userId, tripId } = req.params
  Order.findOne({ where: { userId, isCheckedOut: false } })
    .then(order => TripOrder.destroy({ where: { orderId: order.id, tripId } }))
    .then(() => res.status(200).json({ message: 'successful' }))
    .catch(next)
})

// User wants to see Order history or cart (/orders?cart=active).
//fix
router.get('/:userId/cart', (req, res, next) => {
  if (req.params.userId !== 'undefined') {
    //Login  add to cart
    Order.findOne({
      where: {
        userId: req.params.userId,
        isCheckedOut: false
      },
      include: [Trip, User]
    })
      .then(order => res.json(order))
      .catch(next)
  } else {
    // Guest fetch session item id to cart
    if (req.session.cart.trips[0].id) {
    res.json(req.session.cart)
    }
  }
})

//fix
router.get('/:userId/orders', (req, res, next) => {
  if (req.params.userId !== 'undefined') {
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
  } else {

  }
})
