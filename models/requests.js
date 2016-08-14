var thinky = require('thinky')();
var r = thinky.r;
var type = thinky.type;

var Request = thinky.createModel("requests", {
  id: type.string(),
  checkIn: type.date().options({enforce_type: "strict"}),
  checkOut: type.date().options({enforce_type: "strict"}),
  approved: type.boolean(),
  userId: type.string(),
  spaceId: type.string()
});

Request.create = function(req, res) {
  Request.save({
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    approved: false,
  });
};

module.exports = Request;

var User = require('./users');
var Space = require('./spaces');

Request.hasOne(User, 'user', 'userId', 'id');
Request.belongsTo(Space, 'space', 'SpaceId', 'id');
