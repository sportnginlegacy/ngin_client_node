var assert = require('assert')
var sinon = require('sinon')

var Server = require('./fixtures/http.js')
var NginClient = require('../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testDivision

describe('Division Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.Division.create({id:1}, function(err, division) {
      testDivision = division
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Division Instance', function() {
    it("should make a request for standings with ID and subseasonID ", function(){
      testDivision.standings(1, function(err, division, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/subseasons/1/divisions/1/standings')
        done()
      })
    })
  })

})