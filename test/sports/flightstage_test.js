var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testFlightStage

describe('Flight Stage Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.FlightStage.create({id:1, flight_id:1}, function(err, flightstage) {
      testFlightStage = flightstage
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Flight Stage Instance', function() {
    it('should make requests on addTeam with ID and teamID', function(done) {
      testFlightStage.addTeam(1, function(err, flightstage, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/flights/1/flight_stages/1/add_team/1')
        done()
      })
    })

    it('should make requests on removeTeam with ID and teamID', function(done) {
      testFlightStage.removeTeam(1, function(err, flightstage, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/flights/1/flight_stages/1/remove_team/1')
        done()
      })
    })

    it('should make requests on schedule with flight_stage_id', function(done) {
      testFlightStage.schedule(function(err, f, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/tournament_schedules?flight_stage_id=1')
        done()
      })
    })

    it('should make requests on teams_advancing with flight_stage_id and flight_id', function(done) {
      testFlightStage.teams_advancing(function(err, f, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.method, 'GET')
        assert.equal(opts.req.path, '/flights/1/flight_stages/1/teams_advancing')
        done()
      })
    })

    it('should make requests on advance_teams with flight_stage_id and flight_id', function(done) {
      testFlightStage.advance_teams(function(err, f, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.method, 'PUT')
        assert.equal(opts.req.path, '/flights/1/flight_stages/1/teams_advancing')
        done()
      })
    })
  })

})