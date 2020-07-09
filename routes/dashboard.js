const express = require('express');
const router  = express.Router();
const Coffee = require('../models/Coffee');
const Roaster = require('../models/Roaster');
const {loginCheck} = require('./middlewares')


router.get('/dashboard', loginCheck(), async (req, res, next) => {
 const user = await Roaster.findById(req.user._id).populate('coffees').exec();
  res.render('dashboard', user);
})

router.get('/dashboard/edit', loginCheck(), (req, res, next) => {
  res.render('profileEdit', req.user)
})

router.post('/dashboard/edit', loginCheck(), (req, res, next) => {
  const {brandname, description, location, logo} = req.body;
  const roasterId = req.user._id
  Roaster.findByIdAndUpdate(roasterId, {brandname, description, location, logo})
          .then(() => res.redirect('/dashboard'))
          .catch(err => next(err));
})

router.get('/dashboard/:id/edit', loginCheck(), (req, res, next) => {
  coffeeId = req.params.id;
  Coffee.findById(coffeeId)
        .then(coffee => {
          res.render('coffeeEdit', {coffee}
        )})
        .catch(err => next(err))
})

router.post('/dashboard/:id/edit', loginCheck(), (req, res, next) => {
  coffeeId = req.params.id;
  const {name, description, location, strength, acidity, method, price, tasteProfile} = req.body;
  Coffee.findByIdAndUpdate(coffeeId, {name, description, location, strength, acidity, price, method, tasteProfile})
        .then(() => res.redirect('/dashboard'))
        .catch(err => next(err))
})

router.get('/dashboard/:id/delete', loginCheck(), async (req, res, next) => {
  coffeeId = req.params.id;
  try {
    const updated = await Roaster.findByIdAndUpdate(req.user._id, {$pull: {coffees: {$in: [coffeeId]}}})
    const deleted = await Coffee.findByIdAndDelete(coffeeId)
    res.redirect('/dashboard') 
  }
  catch(err) {
    next(err)
  }
})

router.get('/dashboard/add', loginCheck(), async (req, res, next) => {
   res.render('coffeeAdd');
 })

router.post('/dashboard/add', loginCheck(), async (req, res, next) => {
  const {name, description, location, strength, acidity, method, price, tasteProfile} = req.body;
  const roaster = req.user._id;
  try {
    const added = await Coffee.create({name, description, location, strength, acidity, price, roaster, method, tasteProfile})
    const coffee = await Coffee.findOne({name})
    const coffeeId = coffee._id
    const updated = await Roaster.findByIdAndUpdate(req.user._id, {$push: {coffees: coffeeId}})
    res.redirect('/dashboard')
  }
  catch(err) {
    next(err)
  }
})


module.exports = router;