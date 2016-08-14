var thinky = require('thinky')();
var r = thinky.r;
var type = thinky.type;

var Space = thinky.createModel("spaces", {
  name: type.string(),
  description: type.string(),
  price: type.number(),
  availiblefrom: type.date(),
  availibleto: type.date(),
  userId: type.string()
});

Space.create = function(req, res) {
  Space.save({
    name: req.body.name.options({enforce_type: "strict"}),
    description: req.body.description,
    price: req.body.price.options({enforce_type: "strict"}),
    userId: req.body.userId
  });
};

module.exports = Space;

var User = require('./users');
Space.belongsTo(User, 'user', 'userId', 'id');
