const router = require('express').Router()
const {Trip} = require('../db/models')
module.exports = router

// get all trips

router.get('/', (req, res, next) => {
  Trip.findAll({})
  .then(trips => res.json(trips))
  .catch(next)
})

// get selected trip

router.get('/:id', (req, res, next) => {
  Trip.findByID(Number(req.params.id))
  .then(selectedTrip => res.json(selectedTrip))
  .catch(next)
})



