"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Flight Model', function() {
  var parseList = ngin.FlightStage.parseList

  beforeEach(function() {
    server = Server()
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Flight Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Flight.create({id:1}, function(err, bracket) {
        assert(!err)
        assert(!!bracket)
        assert.equal(bracket.metadata.url, '/flights/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Flight.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        data = JSON.parse(resp.body)
        assert.equal(data.metadata.url, '/flights')
        done()
      })
    })

  })

  describe('Flight Instance', function() {

    var testFlight

    beforeEach(function() {
      testFlight = ngin.Flight.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      var flight = ngin.Flight.create({id:1}, {fetched:true})
      flight.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        data = JSON.parse(resp.body)
        assert.equal(data.metadata.url, '/flights/1')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      var flight = ngin.Flight.create({id:1}, {fetched:true})
      flight.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        data = JSON.parse(resp.body)
        assert.equal(data.metadata.url, '/flights/1')
        done()
      })
    })

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

    it('should make requests on stage', function(done) {
      testFlight.stages(function(err, f, opts) {
        assert(!err, 'err should be falsy')
        assert(!!opts, 'opts should not be falsy')
        assert.equal(opts.req.path, '/flights/1/flight_stages')
        done()
      })
    })

    it('should make requests on schedule with flight_id', function(done) {
      testFlight.schedule(function(err, f, opts) {
        assert(!err, 'err should be falsy')
        assert(!!opts, 'opts should not be falsy')
        assert.equal(opts.req.path, '/tournament_schedules?flight_id=1')
        done()
      })
    })

    it('should make requests on createSchedule with flight_id', function(done) {
      testFlight.createSchedule(function(err, f, opts) {
        assert(!err, 'err should be falsy')
        assert(!!opts, 'opts should not be falsy')
        assert.equal(opts.req.path, '/tournament_schedules?flight_id=1')
        done()
      })
    })

    it('should make requests on publish with flight_id', function(done) {
      testFlight.publish(function(err, f, opts) {
        assert(!err, 'err should be falsy')
        assert(!!opts, 'opts should not be falsy')
        assert.equal(opts.req.method, 'POST')
        assert.equal(opts.req.path, '/tournament_schedules/publish?flight_id=1')
        done()
      })
    })

    it('should make requests on tieBreakPreference with flight_id', function(done) {
      testFlight.tiebreakPreference(function(err, tiebreakPreference, opts) {
        assert(!err, 'err should be falsy')
        assert(!!opts, 'opts should not be falsy')
        assert.equal(opts.req.path, '/flights/1/tiebreak_preference')
        done()
      })
    })

  })

})
