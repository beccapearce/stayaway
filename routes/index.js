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
  res.render('users', { title: 'stayaway' });
});

router.post('/users', function(req, res, next){
  User.authenticate(req, res);
  // redirect message in models/users.js in the authenticate method
});

router.get('/signup', function(req, res, next){
  res.render('signup', {title: 'Sign up'});
});

router.get('/list', function(req, res, next){
  res.render('/spaces/list', {title: 'Spaces'});
});


module.exports = router;
