var assert = require('assert')
var sinon = require('sinon')

var Server = require('./fixtures/http.js')
var NginClient = require('../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testTournamentSchedule

describe('Tournament Schedule Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.TournamentSchedule.create({flight_id:1}, function(err, tournamentSchedule) {
      testTournamentSchedule = tournamentSchedule
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Tournament Instance', function() {
    it('should make requests on publish with flightID', function(done) {
      testTournamentSchedule.publish(1, function(err, tournament, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/tournament_schedules/1/publish')
        done()
      })
    })
  })

})