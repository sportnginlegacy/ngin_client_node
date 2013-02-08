"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('./fixtures/http.js')
var NginClient = require('../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testTournament

describe('Tournament Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.Tournament.create({id:1}, function(err, tournament) {
      testTournament = tournament
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Tournament Instance', function() {
    it('should make requests on addTeam with ID and teamID', function(done) {
      testTournament.teams(1, function(err, tournament, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/tournaments/1/teams')
        done()
      })
    })

    it('should make requests on addTeam with ID and teamID', function(done) {
      testTournament.addTeam(1, function(err, tournament, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/tournaments/1/add_team/1')
        done()
      })
    })

    it('should make requests on removeTeam with ID and teamID', function(done) {
      testTournament.removeTeam(1, function(err, tournament, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/tournaments/1/remove_team/1')
        done()
      })
    })

    it('should make requests on flightDefaults with tournamentID', function(done) {
      testTournament.flightDefaults(function(err, flightDefaults, opts) {
        assert.equal(opts.req.path, '/tournaments/1/flight_defaults')
        done()
      })
    })

    it('should make requests on standingsDefaults with tournamentID', function(done) {
      testTournament.standingsDefaults(function(err, standingsDefaults, opts) {
        assert.equal(opts.req.path, '/tournaments/1/standings_defaults')
        done()
      })
    })

    it('should make requests on tieBreakPreference with tournamentID', function(done) {
      testTournament.tiebreakPreference(function(err, tiebreakPreference, opts) {
        assert.equal(opts.req.path, '/tournaments/1/tiebreak_preference')
        done()
      })
    })
  })

})