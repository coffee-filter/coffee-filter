const express = require('express');
const router  = express.Router();
const Coffee = require('../models/Coffee');

/* GET home page */
router.get('/wizard', (req, res, next) => {
  res.render('wizard');
});

router.get('/wizard/2', (req, res, next) => {
  res.render('wizard2');
})

router.get('/wizard/3', (req, res, next) => {
  res.render('wizard3');
})

router.post('/wizard', (req, res, next) => {
  res.render('wizard');
})

module.exports = router;