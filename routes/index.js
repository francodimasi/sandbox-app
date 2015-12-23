var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Twitter App for Santi');
});

// GET Twits
router.get('/twits', function(req, res, next) {
  res.send(twitterUrl);
});

module.exports = router;
