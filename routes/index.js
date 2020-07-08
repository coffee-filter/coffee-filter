const express = require('express');
const router  = express.Router();


router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/allcoffees', (req, res, next) => {
  res.render('allcoffees');
});

module.exports = router;
