const router = require('express').Router()
const { PromoCode } = require('../db/models')

// get all promo Code

// find active promo code
router.get('/', (req, res, next) => {
  console.log('in the pormo Code')
  const { promoCode } = req.body //cant use body for get
  PromoCode.findOne({
    where: {
      name: promoCode,
      isActive: true
    }
      .then(result => {
        console.log(result)
        res.status(200).json(result)
      })
      .catch(next)
  })
})

module.exports = router
