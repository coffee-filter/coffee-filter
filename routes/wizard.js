const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/wizard', (req, res, next) => {
  res.render('wizard');
});

router.post('/wizard', (req, res, next) => {
  res.send('hello')
})

module.exports = router;