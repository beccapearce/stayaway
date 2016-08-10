var Config = require('../config/config.js'), conf = new Config();

var thinky = require('thinky')({
	host: conf.host,
	port: conf.port,
	db: conf.db
});

module.exports = thinky;
