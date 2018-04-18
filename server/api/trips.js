const router = require('express').Router()
const {Trip} = require('../db/models')


// get all trips

router.get('/', (req, res, next) => {
  console.log('in the router');
  Trip.findAll({})
  .then(trips => res.json(trips))
  .catch(next)
})

// get selected trip

router.get('/:id', (req, res, next) => {
  Trip.findById(Number(req.params.id))
  .then(selectedTrip => res.json(selectedTrip))
  .catch(next)
})

module.exports = router


