const router = require('express').Router();
const { PromoCode } = require('../db/models');

// get all promo Code

// find active promo code
router.get('/:promoCode', (req, res, next) => {
  const promoCode = req.params.promoCode;
  PromoCode.findOne({
    where: {
      name: promoCode,
      isActive: true
    }
  })
    .then(result => {
      if (result) res.status(200).json(result);
      else res.sendStatus(404);
    })
    .catch(next);
});

module.exports = router;
