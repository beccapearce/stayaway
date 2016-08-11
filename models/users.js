var thinky = require('thinky')();
var r = thinky.r;
var type = thinky.type;
var bcrypt = require('bcrypt');

// Create a model - the table is automatically created
var User = thinky.createModel("User", {
    name: type.string(),
    username: type.string(),
    email: type.string(),
    password: type.string()
});

User.create = function (req, res) {
	User.save({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: hash2
	});
};

var hash2 = function(){
  const saltRounds = 10;
  const myPlaintextPassword = req.body.password;
  bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash
    });
    user.saveAll();
});
};

User.authenticate = function (req, res) {
  	User.filter({ "email": req.body.email }).run().then(function(people) {
				if (people[0] && people[0].password === req.body.password) {
          req.session.object = people[0];
          console.log(req.session.object.id);
          res.redirect('/spaces/list');
        } else {
          res.redirect('/signup');
          }
		});
};
//8b6fd
module.exports = User;

var Space = require('./spaces');

User.hasMany(Space, 'spaces', 'id', 'userId');
