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
  it('should include a title', function() {
    assert.ok(this.browser.success);
    assert.equal(this.browser.text('h1'), 'stayaway');
  });
  it('Allow the user to sign up with all fields required', function() {
    assert.ok(this.browser.success);
    this.browser
    .fill('name', 'Fred')
    .fill('email', 'fred@fred.com')
    .fill('password', 'secret')
    .pressButton('Submit');
    this.browser.wait().then(function(){
      expect(this.browser.html("body").to.contain("Welcome"));
    });
  });

    // TODO sign up with fields missing
    // it('Allow the user to sign up', function() {
    //   assert.ok(this.browser.success);
    //   this.browser
    //   .fill('name', 'Fred')
    //   .fill('email', 'fred@fred.com')
    //   .fill('password', 'secret')
    //   .pressButton('Submit');
    //   this.browser.wait().then(function(){
    //     expect(this.browser.html("body").to.contain("Welcome"));
    //   });
    // });



});
