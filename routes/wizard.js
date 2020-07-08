const express = require('express');
const router  = express.Router();
const Coffee = require('../models/Coffee');

/* GET home page */
router.get('/wizard', (req, res, next) => {
  res.render('wizard');
})

router.post('/wizard', (req, res, next) => {
  const brewingmethod = req.body.brewingmethod;
  res.render('wizard2', {brewingmethod});
})

router.post('/wizard/2', (req, res, next) => {
  const brewingmethod = req.body.brewingmethod;
  const acidity = req.body.acidity;
  const strength = req.body.strength;
  res.render('wizard3', {brewingmethod, acidity, strength});
})

router.post('/wizard/results', (req, res, next) => {
  console.log(req.body)
  req.body.brewingmethod = req.body.brewingmethod.split(",")
  const {brewingmethod, acidity, strength, taste} = req.body;
  Coffee.find({
    method: {$in: brewingmethod},
    acidity: {$gte: acidity - 1, $lte: acidity + 1},
    strength: {$gte: strength - 1, $lte: strength + 1},
    tasteProfile: {$in: taste}
  })
        .then(coffees => res.render('coffeeResults', {coffees}))
        .catch(err => next(err))
})

module.exports = router;