const router = require('express').Router();
const { User, Order, TripOrder, Trip } = require('../db/models');
const stripe = require('stripe')('sk_test_YJIPtZSqDVixu3EYQRJkAoWI');

module.exports = router;

//check admin middleware
function isAdmin(req, res, next) {
  User.findById(req.session.passport.user).then(user => {
    if (user.isAdmin) next();
    else res.sendStatus(401);
  });
}

// Check logged in user is the one requesting.
function isLoginUser(req, res, next) {
  const userId = req.params.userId;
  let loggedInUser;
  if (req.session.passport) loggedInUser = req.session.passport.user;
  if (userId === 'undefined' || +userId === +loggedInUser) {
    next();
  } else {
    res.sendStatus(401);
  }
}

// Getting a list of all users.
// Requires Admin Permission
router.get('/', isAdmin, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields
    attributes: ['id', 'email']
  })
    .then(users => {
      res.json(users);
    })
    .catch(next);
});

// Find a single user
// Only return for that user
router.get('/:userId', isLoginUser, (req, res, next) => {
  User.findById(req.params.userId, {
    attributes: ['id', 'firstName', 'lastName', 'email']
  })
    .then(user => res.status(200).send(user))
    .catch(next);
});

// Creating new user
// No protection necessary
router.post('/', (req, res, next) => {
  const { firstName, lastName, phoneNumber, email } = req.body;
  User.create({
    firstName,
    lastName,
    email,
    phoneNumber
  })
    .then(user => {
      res.status(201).send(user);
    })
    .catch(next);
});

// Updating a users information.
// Specific to that user
router.put('/:userId', isLoginUser, (req, res, next) => {
  const { firstName, lastName, password, email, phoneNumber } = req.body;
  const id = req.params.userId;
  User.findById(id)
    .then(user =>
      user.update({ firstName, lastName, password, email, phoneNumber })
    )
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(next);
});

// Removes a user from the database
// Admin only
router.delete('/:userId', isAdmin, (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .then(user => user.destroy())
    .then(() => {
      res.status(204).end();
    })
    .catch(next);
});

// User adds trip to cart.
// Specific to that user
router.post('/:userId/orders', isLoginUser, (req, res, next) => {
  const userId = req.params.userId;
  const { tripId, numberOfGuests } = req.body;

  if (userId !== 'undefined') {
    Order.addTripToOrder(tripId, userId, numberOfGuests)
      .then(trip => res.status(200).json(trip))
      .catch(next);
  } else {
    let cart = req.session.cart;
    // tripId, numberOfGuests
    if (cart.trips.length < 1) {
      //first time adding to cart
      Trip.getTripDetail(tripId).then(result => {
        let tripOrder = {
          numberOfGuests,
          tripId
        };
        let tripDetail = result.dataValues;
        tripDetail.tripOrder = tripOrder;
        cart = {
          orderId: null,
          trips: [tripDetail],
          isCheckout: false,
          stripeTokenId: null,
          orderTotal: 0
        };
        req.session.cart = cart;
        res.status(200).json(tripDetail);
      });
    } else {
      console.log('EROOOOOOOO')
      Trip.getTripDetail(tripId).then(result => {
        let tripOrder = {
          numberOfGuests,
          tripId
<<<<<<< HEAD
        };
        let tripDetail = result.dataValues;
        tripDetail.tripOrder = tripOrder;
        req.session.cart.trips.push(tripDetail);
        res.status(200).json(req.session.cart.trips);
      });
=======
        }
        let tripDetail = result.dataValues
        tripDetail.tripOrder = tripOrder

        req.session.cart.trips.push(tripDetail)
        console.log(req.session.cart.trips, '122')
        res.status(200).json(tripDetail)
      })
>>>>>>> 54449fec5508ba234a8db7633dabe13d857fdb3a
    }
  }
});

router.put('/:userId/orders', (req, res, next) => {
  const userId = req.params.userId;
  const { tripId, numberOfGuests } = req.body;
  if (userId !== 'undefined') {
    Order.findOne({
      where: { userId: userId, isCheckedOut: false },
      include: [Trip, User]
    })
      .then(order => {
        // TripOrder only exists on trip objects, need to filter to trip with tripId
        const tripOrder = order.trips.find(t => t.id === tripId).tripOrder;
        return tripOrder.update({ numberOfGuests });
      })
      .then(trip => res.status(200).json(trip))
      .catch(next);
  } else {
    //guset
    let cart = req.session.cart.trips;
    console.log('145', req.session.cart.trips);
    cart.filter(each => {
      if (each.id === +tripId) {
        each.tripOrder.numberOfGuests = numberOfGuests;
      }
    });
    console.log(cart, '152');
    console.log(req.session.cart.trips, '153');
    res.status(200).json(req.session.cart.trips);
  }
});

// User wants to checkout the cart
//Specific to that user
router.put(`/:userId/orders/checkout`, isLoginUser, (req, res, next) => {
  const token = req.body.stripeToken;
  const promoCode = req.body.promoCode;
  //requires promocode to be passed in
  const { userId } = req.params;

  Order.findOne({ where: { userId: +userId, isCheckedOut: false } })
    .then(order =>
      order.update({
        isCheckedOut: true,
        stripeTokenId: token
      })
    )
    .then(order => order.totalPrice(promoCode))
    .then(updatedOrder => {
      return stripe.charges.create({
        amount: updatedOrder.orderTotal,
        currency: 'usd',
        description: 'Example charge',
        source: token
      });
    })
    .then(data => res.status(201).json(data))
    .catch(next);
});

// User wants to delete a trip from the cart
// Specific from that user.
router.delete('/:userId/orders', isLoginUser, (req, res, next) => {
  const userId = req.params.userId;
  const { tripId } = req.body;
  Order.findOne({
    where: { userId: userId, isCheckedOut: false },
    include: [Trip, User]
  })
    .then(order => {
      // TripOrder only exists on trip objects, need to filter to trip with tripId
      const tripOrder = order.trips.filter(t => t.id === tripId)[0].tripOrder;
      return tripOrder.destroy();
    })
    .then(trip => res.status(200).json(trip))
    .catch(next);
});

// User wants to remove a trip from the cart.
// router.delete(`api/users/${userId}/${tripId}`)
//  destroy return 1 , therefore send {message : successful} back to thunk

router.delete(`/:userId/trip/:tripId`, (req, res, next) => {
  const { userId, tripId } = req.params;
  if (userId !== 'undefined') {
    //User del item in cart
    Order.findOne({ where: { userId, isCheckedOut: false } })
      .then(order =>
        TripOrder.destroy({ where: { orderId: order.id, tripId } })
      )
      .then(() => res.status(200).json({ message: 'successful' }))
      .catch(next);
  } else {
    // Guest checkout
    // clear session trips[]
    let deletedTripsInCart = req.session.cart.trips.filter(
      each => each.id !== +tripId
    );
    req.session.cart.trips = deletedTripsInCart;
    //find the delete one , return and del it from state and session
    res.status(200).json(req.session.cart);
    // send json back req.session.cart
  }
});

// User wants to see Order history or cart (/orders?cart=active).
//fix
// Specific from that user.
router.get('/:userId/cart', isLoginUser, (req, res, next) => {
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
      .catch(next);
  } else {
    // Guest fetch session item id to cart
    if (req.session.cart.trips.length > 0) {
      res.json(req.session.cart);
    }
  }
});

//fix
router.get('/:userId/orders', isLoginUser, (req, res, next) => {
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
        res.status(404).send('Not Found');
        next(err);
      });
  }
});
