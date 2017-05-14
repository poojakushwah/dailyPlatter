var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Project = require('../models/Project');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Daily Platter' });
});



module.exports = router;
