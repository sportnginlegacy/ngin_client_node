var assert = require('assert')
var sinon = require('sinon')

var Server = require('./fixtures/http.js')
var NginClient = require('../index')
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

    it('should make requests on tieBreakPreference with flightID and flightStageID', function(done) {
      testFlightStage.tiebreakPreference(function(err, tiebreakPreference, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/flights/1/flight_stages/1/tiebreak_preference')
        done()
      })
    })
  })

})