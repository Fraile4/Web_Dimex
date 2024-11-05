/*  MONGO DB CONNECTION */
const mongojs = require('mongojs')
const db = mongojs('bezeroakdb', ['bezeroak'])

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dimex' });
});

module.exports = router;
