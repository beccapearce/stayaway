var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'stayaway' });
});

router.post('/', function(req, res, next) {
  var salt = bcrypt.genSaltSync(10);
  var user = new User({
  name: req.body.name,
  email: req.body.email,
  password: bcrypt.hashSync(req.body.password, salt)
  });
  user.saveAll();
  res.redirect('/spaces/list');
});

router.get('/spaces', function(req, res, next){
  res.render('spaces', {title: 'stayaway'});

});

// router.get('/list', function(req, res, next){
//   res.render('/spaces/list', {title: 'Spaces'});
// });

module.exports = router;
