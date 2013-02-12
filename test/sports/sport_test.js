var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testSport

describe('Sport Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.Sport.create({id:1}, function(err, sport) {
      testSport = sport
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Standings Module', function() {
    it("should make a request for standings modules with id", function(done){
      testSport.standingsModules(function(err, standingsModule, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/sports/1/standings_modules')
        done()
      })
    })
  })

})
