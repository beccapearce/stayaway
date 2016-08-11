var express = require('express');
var router = express.Router();
var Space = require('../models/spaces.js');

router.get('/', function(req, res, next){
  res.render('spaces', {title: 'stayaway'});
});

router.get('/new', function(req, res, next){
  res.render('spaces/new', {title: 'Add New Spaces'});
});

router.post('/new', function(req, res, next){
  var space = new Space({
  name: req.body.name,
  description: req.body.description,
  price: req.body.price
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
    res.render('spaces/list', { title: 'Spaces', spaces: allSpaces });
  });
});

module.exports = router;
