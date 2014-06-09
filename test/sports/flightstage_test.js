"use strict"
var _ = require('underscore')
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Flight Stage Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Flight Stage Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.FlightStage.create({id:1, flight_id:1}, function(err, flightStage) {
        assert(!err)
        assert(!!flightStage)
        assert.equal(flightStage.metadata.url, '/flights/1/flight_stages/1')
        done()
      })
    })

    _.each(['pool','single_elim','double_elim','round_robin','free'], function(type) {
      it('should make requests on create with ID and type = ' + type, function(done) {
        ngin.FlightStage.create({id:1, flight_id:1, type:type}, function(err, flightStage) {
          assert(!err)
          assert(!!flightStage)
          assert.equal(flightStage.metadata.url, '/flights/1/flight_stages/1')
          assert.equal(flightStage.type, type)
          done()
        })
      })
    })

    it('should make requests on list', function(done) {
      ngin.FlightStage.list({flight_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/flights/1/flight_stages')
        done()
      })
    })

  })

  describe('Flight Stage Instance', function() {

    var testFlightStage

    beforeEach(function() {
      testFlightStage = ngin.FlightStage.create({id:1, flight_id:1}, {fetched:true})
    })

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

    it('should make requests on advancement_slots with flight_stage_id and flight_id', function(done) {
      testFlightStage.advancement_slots(function(err, f, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.method, 'GET')
        assert.equal(opts.req.path, '/flights/1/flight_stages/1/advancement_slots')
        done()
      })
    })

    it('should make requests on teams_advancing with flight_stage_id and flight_id', function(done) {
      testFlightStage.teamsAdvancing(function(err, f, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.method, 'GET')
        assert.equal(opts.req.path, '/flights/1/flight_stages/1/teams_advancing')
        done()
      })
    })

    it('should make requests on advance_teams with flight_stage_id and flight_id', function(done) {
      testFlightStage.advanceTeams(function(err, f, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.method, 'POST')
        assert.equal(opts.req.path, '/flights/1/flight_stages/1/teams_advancing')
        done()
      })
    })

    it('should make requests on standings with flight_stage_id and flight_id', function(done) {
      testFlightStage.standings(function(err, f, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.method, 'GET')
        assert.equal(opts.req.path, '/flight_stages/1/standings')
        done()
      })
    })

    it('should make requests on brackets with flight_stage_id', function(done) {
      testFlightStage.brackets(function(err, f, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.method, 'GET')
        assert.equal(opts.req.path, '/brackets?flight_stage_id=1')
        done()
      })
    })

  })

})
