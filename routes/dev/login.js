var express = require('express');
var router = express.Router();
const db = require('../../libs/db.js');
const mysql = require('mysql');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.type('html');
  res.render('login/login.html')
});

module.exports = router;
