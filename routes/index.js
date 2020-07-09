const express = require('express');
const router  = express.Router();
const Coffee = require('../models/Coffee');
const Roaster = require('../models/Roaster');
const { uploader, cloudinary } = require("../config/cloudinary.js")

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/allcoffees', (req, res, next) => {
   Coffee.find().then(coffees=>{
      console.log(coffees)
    res.render('allcoffees', {coffees})
  })
});

router.get('/allroasters', (req, res, next) => {
  Roaster.find().then(roasters=>{

   res.render('allroasters', {roasters})
 })
 ;
});

// router.get('/allcoffees', (req, res, next) => {
//  // let cafe = Coffee.find()
//   //console.log('hola', cafe)
//   res.render('allcoffees');
// });



module.exports = router;
