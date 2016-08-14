var express = require('express');
var router = express.Router();
var Space = require('../models/spaces.js');
var Request = require('../models/requests.js');
var User = require('../models/users.js');

router.get('/', function(req, res, next){
  res.render('spaces', {title: 'stayaway', currentUser: req.session.object});
});

router.get('/new', function(req, res, next){
  res.render('spaces/new', {title: 'Add New Spaces', currentUser: req.session.object});
});

router.post('/new', function(req, res, next){
  var space = new Space({
  name: req.body.name,
  description: req.body.description,
  price: req.body.price,
  availiblefrom: req.body.avaliblefrom,
  availibleto: req.body.avalibleto,
  userId: req.session.object.id
  });
  console.log(space);
  space.saveAll();
  res.redirect('/spaces/list');
});

router.get('/list', function(req, res, next){
  var allSpaces;
  Space.run().then(function(spaces) {
    allSpaces =  spaces;
  }).then(function() {
    res.render('spaces/list', { title: 'Spaces', spaces: allSpaces, currentUser: req.session.object });
  });
});

router.get('/view', function(req, res, next) {
  var spaceChoice;
  Space.filter({id: req.query.id}).run().then(function(space) {
    spaceChoice =  space[0];
  }).then(function() {
    res.render('spaces/page', { title: 'Spaces', space: spaceChoice, currentUser: req.session.object  });
  });
});

router.post('/view', function(req, res, next){
  var request = new Request({
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    approved: False,
    userId: req.session.object.id,
  });
  console.log(request);
  request.saveAll();
  res.redirect('/');
});

module.exports = router;
