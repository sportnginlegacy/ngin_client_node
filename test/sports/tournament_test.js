"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Tournament Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Tournament Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Tournament.create({id:1}, function(err, tournament, data, resp) {
        assert(!err)
        assert(!!tournament)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournaments/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Tournament.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournaments')
        done()
      })
    })

  })

  describe('Tournament Instance', function() {

    var testTournament

    beforeEach(function() {
      testTournament = ngin.Tournament.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      testTournament.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/tournaments/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete testTournament.id
      testTournament.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/tournaments')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      testTournament.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/tournaments/1')
        done()
      })
    })

    it('should make requests on teams with ID', function(done) {
      testTournament.teams(function(err, tournament, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournaments/1/teams')
        done()
      })
    })

    it('should make requests on addTeam with ID and teamID', function(done) {
      testTournament.addTeam(1, function(err, tournament, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/tournaments/1/add_team/1')
        done()
      })
    })

    it('should make requests on removeTeam with ID and teamID', function(done) {
      testTournament.removeTeam(1, function(err, tournament, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/tournaments/1/remove_team/1')
        done()
      })
    })

    it('should make requests on players with ID', function(done) {
      testTournament.players(function(err, tournament, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournaments/1/players')
        done()
      })
    })

    it('should make requests on addPlayer with ID and playerID', function(done) {
      testTournament.addPlayer(1, function(err, tournament, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/tournaments/1/add_player/1')
        done()
      })
    })

    it('should make requests on removePlayer with ID and playerID', function(done) {
      testTournament.removePlayer(1, function(err, tournament, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/tournaments/1/remove_player/1')
        done()
      })
    })

    it('should make requests on flightDefaults with tournamentID', function(done) {
      testTournament.flightDefaults(function(err, flightDefaults, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournaments/1/flight_defaults')
        done()
      })
    })

    it('should make requests on standingsDefaults with tournamentID', function(done) {
      testTournament.standingsDefaults(function(err, standingsDefaults, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournaments/1/standings_defaults')
        done()
      })
    })

    it('should make requests on tieBreakPreference with tournamentID', function(done) {
      testTournament.tiebreakPreference(function(err, tiebreakPreference, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournaments/1/tiebreak_preference')
        done()
      })
    })

    it('should make requests on gameLimits with tournamentID', function(done) {
      testTournament.gameLimits(function(err, gameLimits, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournaments/1/game_limits')
        done()
      })
    })

    it('should make requests on add_reservation with a ID and query params', function(done) {
      testTournament.addVenue(1, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/venues/1/reservations?reserver_type=Tournament&reserver_id=1')
        done()
      })
    })

    it('should make requests on remove_reservation with a ID and query params', function(done) {
      testTournament.removeVenue(1, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/venues/1/reservations?reserver_type=Tournament&reserver_id=1')
        done()
      })
    })

    it('should make requests on add_reservation with a ID and query params', function(done) {
      testTournament.addSubvenue(1,2, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/subvenues/2/reservations?reserver_type=Tournament&reserver_id=1')
        done()
      })
    })

    it('should make requests on remove_reservation with a ID and query params', function(done) {
      testTournament.removeSubvenue(1,2, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/subvenues/2/reservations?reserver_type=Tournament&reserver_id=1')
        done()
      })
    })

    it('should make requests on venues with a ID and query params', function(done) {
      testTournament.venues(1, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/venues?tournament_id=1&org_id=1')
        done()
      })
    })

    it('should make requests on subvenues with a ID and query params', function(done) {
      testTournament.subvenues(1, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path.match(/^\/subvenues/g).length, 1)
        assert.equal(resp.req.path.match(/tournament_id=1{1}|venue_id=1{1}/g).length, 2)
        done()
      })
    })

    it('should make requests on reservations with a ID', function(done) {
      testTournament.reservations(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/reservations?tournament_id=1')
        done()
      })
    })
  })

})
