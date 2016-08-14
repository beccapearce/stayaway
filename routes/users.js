var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/users.js');

router.get('/new', function(req, res, next){
  res.render('signup', {title: 'Sign up', currentUser: req.session.object });
});

router.get('/', function(req, res, next){
  res.render('users', { title: 'stayaway', currentUser: req.session.object });
});

router.post('/', function(req, res, next){
  User.authenticate(req, res);
  // redirected in the user model
});

router.get('/end', function(req, res, next){
  req.session.destroy();
  res.redirect('/spaces/list');
});

router.get('/me', function(req, res, next) {
  var currentUser;
  User.filter({id: req.query.id}).run().then(function(users) {
    currentUser =  users[0];
  }).then(function() {
    res.render('users/profile', { title: 'Profile', currentUser: req.session.object });
  });
});

module.exports = router;
