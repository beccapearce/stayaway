var thinky = require('thinky')();
var r = thinky.r;
var type = thinky.type;
var bcrypt = require('bcrypt');

// Create a model - the table is automatically created
var User = thinky.createModel("User", {
    name: type.string().options({enforce_type: "strict"}),
    email: type.string(),
    password: type.string().options({enforce_type: "strict"})
});

User.create = function (req, res) {
	User.save({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});
};


User.authenticate = function (req, res) {
  	User.filter({ "email": req.body.email }).run().then(function(user) {
        if (user[0] && bcrypt.compareSync(req.body.password, user[0].password)){
          req.session.object= user[0];
          req.session.save();
            res.redirect('/spaces/list');
            return true;
          } else {
            res.redirect('/users/new');
            return false;
            }
		});
};
module.exports = User;

var Space = require('./spaces');
var Request = require('./requests');

User.hasMany(Space, 'spaces', 'id', 'userId');
User.hasMany(Request, 'requests', 'id', 'userId');
