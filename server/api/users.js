const router = require('express').Router()
const {User} = require('../db/models')
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
  const {firstName, lastName, email } = req.body
  User.create({
    firstName, lastName, email
  }).then(user => {
    res.status(201).send(user)
  }).catch(next);
})

// Updating a users information.

router.put('/:userId', (res, req, next) => {
  const id = req.params.userId
  User.findById(id)
    .then(user => {
      return user.update(req.body)
    .then(updatedUser => {
      res.status(201).send(res.json(updatedUser))
    }).catch(next);
  })
})
