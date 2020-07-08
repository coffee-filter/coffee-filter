const express = require('express');
const router  = express.Router();
const Coffee = require('../models/Coffee');
const Roaster = require('../models/Roaster');
const passport = require('passport');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get("/signup", (req, res, next) => {
  res.render('signup');
})

router.get('/login', (req, res, next) => {
  res.render('login');
})

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
})

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  if (password.length < 6) {
    res.render('signup', {
      message: 'Your password must be at least 6 characters long.'
    });
  }
  if (username === '') {
    res.render('signup', { message: 'Your username cannot be empty' })
  }

  Roaster.findOne({ username: username })
    .then(found => {
        if (found !== null) {
          res.render('signup', { message: 'Incorrect credentials' })
        } else {
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(password, salt)

          Roaster.create({ username: username, password: hash })
            .then(roaster => {
                req.login(roaster, err => {
                  if (err) next(err)
                  else res.redirect('/dashboard')
                })
            })
            .catch(err => {
              next(err)
            })
          }
      })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  passReqToCallback: true
}))


module.exports = router;