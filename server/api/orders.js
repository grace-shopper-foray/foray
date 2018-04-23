const router = require('express').Router();
const { TripOrder, Order, Trip, User } = require('../db/models');

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

module.exports = router;
