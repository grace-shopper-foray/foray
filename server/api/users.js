const router = require('express').Router()
const {User, Order, TripOrder, Trip} = require('../db/models')
module.exports = router

// Getting a list of all users.

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

// Find a single user

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId, {
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
  .then(user => res.json(user))
  .catch(next)
})

// Creating new user

router.post('/', (req, res, next) => {
  const {firstName, lastName, phoneNumber, email } = req.body
  User.create({
    firstName, lastName, email, phoneNumber
  }).then(user => {
    res.status(201).send(user)
  }).catch(next);
})

// Updating a users information.

router.put('/:userId', (req, res, next) => {
  const id = req.params.userId
  User.findById(id)
    .then(user => {
      return user.update(req.body)
    .then(updatedUser => {
      res.status(201).send(res.json(updatedUser))
    }).catch(next);
  })
})

// Removes a user from the database

router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
  .then(user => user.destroy())
  .then(output => {
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
  }).spread((order, created) => {
    return TripOrder.create({ orderId: order.id, tripId, numberOfGuests })
  })
  .then(() => Trip.findById(tripId))
  .then(trip => res.status(201).json(trip) )
  .catch(next)
});

// User wants to update the number of guests on an item in cart

router.put('/:userId/orders', (req, res, next) => {
  const userId = req.params.userId
  const { tripId, numberOfGuests } = req.body
  Order.findOne({
    where: { userId: userId, isCheckedOut: false },
    include: [Trip, User]
  }).then(order => {
    // TripOrder only exists on trip objects, need to filter to trip with tripId
    const tripOrder = order.trips.filter(t => t.id === tripId)[0].tripOrder
    return tripOrder.update({ orderId: order.id, tripId, numberOfGuests })
  }).then(trip => res.status(200).json(trip) )
  .catch(next)
});

// User wants to delete a trip from the cart

router.delete('/:userId/orders', (req, res, next) => {
  const userId = req.params.userId
  const { tripId } = req.body
  Order.findOne({
    where: { userId: userId, isCheckedOut: false },
    include: [Trip, User]
  }).then(order => {
    // TripOrder only exists on trip objects, need to filter to trip with tripId
    const tripOrder = order.trips.filter(t => t.id === tripId)[0].tripOrder
    return tripOrder.destroy()
  }).then(trip => res.status(204).json(trip) )
  .catch(next)
});

// User wants to see Order history.
//orders?cart=active

router.get('/:userId/orders', (req, res, next) => {
  const isActive = (req.query.cart === 'active')
  if (req.query.cart !== undefined) { // There is a query string for cart
    Order.findOne({
      where: {
        userId: req.params.userId,
        isCheckedOut: !isActive
      },
      include: [Trip, User]
    })
    .then(order => res.json(order))
    .catch(next)
  } else { // No query value, return all orders for user.
    Order.findAll({
      where: {
        userId: req.params.userId,
      },
      include: [Trip, User]
    })
    .then(orders => res.json(orders))
    .catch(err => {
      res.status(404).send('Not Found');
      next(err);
    });
  }
})
