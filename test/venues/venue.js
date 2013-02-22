var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testVenue

describe('Venue Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.Venue.create({id:1}, function(err, venue) {
      testVenue = venue
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Venue Instance', function() {
    it('should make requests on availableTimes with ID', function(done) {
      testVenue.availableTimes(function(err, venue, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/venues/1/available_times')
        done()
      })
    })

    it('should make requests on updateAvailableTimes with ID', function(done) {
      testVenue.updateAvailableTimes(function(err, venue, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/venues/1/available_times')
        done()
      })
    })
  })

})