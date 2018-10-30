var express = require('express');
var router = express.Router();
// var index = 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.type('html');
  res.render('index');
});

module.exports = router;
