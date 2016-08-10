var express = require('express');
var router = express.Router();
var User = require('../models/users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'stayaway' });
});

router.post('/', function(req, res, next) {
  var user = new User({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password
  });
  console.log(user);
  user.saveAll();
  res.redirect('/users');
});

router.get('/users', function(req, res, next){
  res.render('users');
});

router.post('/users', function(req, res, next){
  User.authenticate(req, res);
  // redirect message in models/users.js in the authenticate method
});

router.get('/spaces', function(req, res, next){
  res.render('spaces', {title: 'stayaway'});
});

module.exports = router;
