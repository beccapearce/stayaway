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
  	User.filter({ "email": req.body.email }).run().then(function(people) {
        if (people[0] && bcrypt.compareSync(req.body.password, people[0].password)){
          req.session.object = people[0];
            res.redirect('/spaces/list');
          } else {
            res.redirect('/users/new');
            }
		});
};
module.exports = User;

var Space = require('./spaces');

User.hasMany(Space, 'spaces', 'id', 'userId');
