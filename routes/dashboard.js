const express = require('express');
const router  = express.Router();
const Coffee = require('../models/Coffee');
const Roaster = require('../models/Roaster');
const {loginCheck} = require('./middlewares')


router.get('/dashboard', loginCheck(), async (req, res, next) => {
 const user = await Roaster.findById(req.user._id).populate('coffees').exec();
 console.log(user.coffees)
  res.render('dashboard',user );
});


module.exports = router;