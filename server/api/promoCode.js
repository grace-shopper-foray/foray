const router = require('express').Router()
const { PromoCode } = require('../db/models')

// get all promo Code

// find active promo code
router.get('/:promoCode', (req, res, next) => {
  console.log('in the promo Code')
  const promoCode = req.params.promoCode
  PromoCode.findOne({
    where: {
      name: promoCode,
      isActive: true
    }
  })
    .then(result => {
      // OH: Should let error bubbling deal with this
      // and set the message on the front end:
      if (result) res.status(200).json(result)
      else res.status(200).json({ error: 'Not Found' })
    })
    .catch(next)
})

module.exports = router
