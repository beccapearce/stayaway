process.env.NODE_END = 'test';
var environment = 'test';
//might need to require something for the database here too.
var Browser = require('zombie');
var app = require('../../app');
var http = require('http');
var assert = require('assert');

describe("index page", function() {
  before(function(){
    this.server = http.createServer(app).listen(3000);
    this.browser = new Browser({ site: "http://localhost:3000"});
  });
  before(function(done) {
    this.browser.visit('/', done);
  });

  it('Only allows registered users to sign in', function() {
    assert.ok(this.browser.success);
    this.browser
    .fill('email', 'notfred@notfred.com')
    .fill('password', 'iamnotfred')
    .pressButton('Submit');
    this.browser.wait().then(function(){
      expect(this.browser.html("body").to.contain("Please sign in"));
    });
  });
});
