process.env.NODE_END = 'test';
var environment = 'test';
//might need to require something for the database here too.
var Browser = require('zombie');
var app = require('../../app');
var http = require('http');
var assert = require('assert');


describe('New Spaces Page', function() {
  before(function(){
    this.server = http.createServer(app).listen(3000);
    this.browser = new Browser({ site: "http://localhost:3000"});
  });
  before(function(done) {
    this.browser.visit('/spaces/new', done);
  });

  it('is expected to allow user to set up new a space', function(){
    assert.ok(this.browser.success);
    this.browser
    .fill('name', 'the shard')
    .fill('description', 'massive mate')
    .fill('price', 9)
    .pressButton('Submit');
    this.browser.wait().then(function(){
      assert.equal(this.browser.html("body").to.contain("the shard"));
      assert.equal(this.browser.html("body").to.contain("massive"));
      assert.equal(this.browser.html("body").to.contain(9));
    });
  });
});
