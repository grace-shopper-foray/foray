const router = require('express').Router();
const { TripOrder, Order, Trip, User } = require('../db/models');

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
  if (userId === 'undefined' || +userId === +loggedInUser) next();
  else {
    console.log('HERERE');
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

module.exports = router;
