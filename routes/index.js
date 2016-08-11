var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'stayaway' });
});

router.post('/', function(req, res, next) {
  var user = new User({
  name: req.body.name,
  email: req.body.email,
  password: hash2
  });
  // var hash2 = function(){
  //   var saltRounds = 10;
  //   var myPlaintextPassword = req.body.password;
  //   bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  //     console.log(hash);
  //     return hash;
  // });
  // };
  user.saveAll();
  res.redirect('/users');
});

router.get('/users', function(req, res, next){
  res.render('users', { title: 'stayaway' });
});

router.post('/users', function(req, res, next){
  User.authenticate(req, res);
});

router.get('/spaces', function(req, res, next){
  res.render('spaces', {title: 'stayaway'});

});

router.get('/signup', function(req, res, next){
  res.render('signup', {title: 'Sign up'});
});

router.get('/list', function(req, res, next){
  res.render('/spaces/list', {title: 'Spaces'});
});


router.get('/signout', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
