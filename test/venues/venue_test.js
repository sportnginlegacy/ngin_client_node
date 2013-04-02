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

  describe('Venue Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Venue.create({id:1}, function(err, venue, data, resp) {
        assert(!err)
        assert(!!venue)
        assert.equal(resp.req.method, 'GET')
        assert.equal(venue.metadata.url, '/venues/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Venue.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/venues')
        done()
      })
    })
  })

  describe('Venue Instance', function() {

    var testVenue

    beforeEach(function() {
      testVenue = ngin.Venue.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      testVenue.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/venues/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete testVenue.id
      testVenue.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/venues')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      testVenue.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/venues/1')
        done()
      })
    })

    it('should make requests on standingsDefaults with tournamentID', function(done) {
      testVenue.availableTimes(function(err, availableTimes, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/venues/1/available_times')
        done()
      })
    })

  })

})
