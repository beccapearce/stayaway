var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/users.js');

router.get('/new', function(req, res, next){
  res.render('signup', {title: 'Sign up'});
});

router.get('/', function(req, res, next){
  res.render('users', { title: 'stayaway' });
});

router.post('/', function(req, res, next){
  User.authenticate(req, res);
  // redirected in the user model
});

router.get('/end', function(req, res, next){
  req.session.destroy();
  res.redirect('/spaces/list');
});

module.exports = router;
