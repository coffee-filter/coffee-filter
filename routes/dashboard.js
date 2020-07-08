const express = require('express');
const router  = express.Router();
const Coffee = require('../models/Coffee');
const Roaster = require('../models/Roaster');


router.get('/dashboard', (req, res, next) => {
  res.render('dashboard', req.user);
});


module.exports = router;