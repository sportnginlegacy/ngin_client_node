"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Flight Model', function() {
  var parseList = ngin.FlightStage.parseList

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Flight Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Flight.create({id:1}, function(err, flight, data, resp) {
        assert(!err)
        assert(!!flight)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/flights/1')
        done()
      })
    })

    it('should make requests on list with tournament_id', function(done) {
      ngin.Flight.list({tournament_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/flights?tournament_id=1')
        done()
      })
    })

    it('should make error on list without tournament_id', function(done) {
      ngin.Flight.list({}, function(err, data, resp) {
        assert(err)
        assert(!data)
        assert(!resp)
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
      testFlight.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/flights/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete testFlight.id
      testFlight.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/flights')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      testFlight.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/flights/1')
        done()
      })
    })

    it('should make requests on addTeam with ID and teamID', function(done) {
      testFlight.addTeam(1, function(err, flight, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/flights/1/add_team/1')
        done()
      })
    })

    it('should make requests on removeTeam with ID and teamID', function(done) {
      testFlight.removeTeam(1, function(err, f, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/flights/1/remove_team/1')
        done()
      })
    })

    it('should make requests on addToWaitlist with ID and teamID', function(done) {
      testFlight.addToWaitlist(1, function(err, f, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/flights/1/add_to_waitlist/1')
        done()
      })
    })

    it('should make requests on removeFromWaitlist with ID and teamID', function(done) {
      testFlight.removeFromWaitlist(1, function(err, f, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/flights/1/remove_from_waitlist/1')
        done()
      })
    })

    it('should make requests on stage', function(done) {
      testFlight.stages(function(err, f, resp) {
        assert(!err, 'err should be falsy')
        assert(!!resp, 'resp should not be falsy')
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/flights/1/flight_stages')
        done()
      })
    })

    it('should make requests on schedule with flight_id', function(done) {
      testFlight.schedule(function(err, f, resp) {
        assert(!err, 'err should be falsy')
        assert(!!resp, 'resp should not be falsy')
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournament_schedules?flight_id=1')
        done()
      })
    })

    it('should make requests on createSchedule with flight_id', function(done) {
      testFlight.createSchedule(function(err, f, resp) {
        assert(!err, 'err should be falsy')
        assert(!!resp, 'resp should not be falsy')
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/tournament_schedules?flight_id=1')
        done()
      })
    })

    it('should make requests on publish with flight_id', function(done) {
      testFlight.publish(function(err, f, resp) {
        assert(!err, 'err should be falsy')
        assert(!!resp, 'resp should not be falsy')
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/tournament_schedules/publish?flight_id=1')
        done()
      })
    })

    it('should make requests on gameLimits with flightID', function(done) {
      testFlight.gameLimits(function(err, gameLimits, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/flights/1/game_limits')
        done()
      })
    })

    // this feature is disabled for the time being.
    // it('should make requests on tieBreakPreference with flight_id', function(done) {
    //   testFlight.tiebreakPreference(function(err, tiebreakPreference, resp) {
    //     assert(!err, 'err should be falsy')
    //     assert(!!resp, 'resp should not be falsy')
    //     assert.equal(resp.req.path, '/flights/1/tiebreak_preference')
    //     done()
    //   })
    // })

  })

})
