var assert = require('assert')
var sinon = require('sinon')

var Server = require('./fixtures/http.js')
var NginClient = require('../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testFlight

describe('Flight Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.Flight.create({id:1}, function(err, flight) {
      testFlight = flight
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Flight Instance', function() {
    it('should make requests on addTeam with ID and teamID', function(done) {
      testFlight.addTeam(1, function(err, flight, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/flights/1/add_team/1')
        done()
      })
    })

    it('should make requests on removeTeam with ID and teamID', function(done) {
      testFlight.removeTeam(1, function(err, f, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/flights/1/remove_team/1')
        done()
      })
    })

    it('should make requests on addToWaitlist with ID and teamID', function(done) {
      testFlight.addToWaitlist(1, function(err, f, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/flights/1/add_to_waitlist/1')
        done()
      })
    })

    it('should make requests on removeFromWaitlist with ID and teamID', function(done) {
      testFlight.removeFromWaitlist(1, function(err, f, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/flights/1/remove_from_waitlist/1')
        done()
      })
    })
  })

})