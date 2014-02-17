"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('StandingsPreference Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('StandingsPreference Class', function() {

    it("should not throw on create without ID", function(done) {
      assert.doesNotThrow(function(){
        ngin.StandingsPreference.create({key:'val'})
      })
      done()
    })

    it("should throw on list", function(done) {
      assert.throws(function() {
        ngin.StandingsPreference.list({}, done)
      }, Error)
      done()
    })

  })

  describe('StandingsPreference Instance', function() {

    var standingsPref

    it("should make a request on fetch with flight_id", function(done) {
      standingsPref = new ngin.StandingsPreference({flight_id:1}, {fetched:true})
      standingsPref.fetch(function(err, standingsPref, resp) {
        console.error(err)
        assert(!err)
        assert(!!standingsPref)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/flights/1/standings_preferences')
        done()
      })
    })

    it("should make a request on fetch with division_id and game_type", function(done) {
      standingsPref = new ngin.StandingsPreference({division_id:1, game_type:'regular_season'}, {fetched:true})
      standingsPref.fetch(function(err, standingsPref, resp) {
        console.error(err)
        assert(!err)
        assert(!!standingsPref)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/divisions/1/standings_preferences/regular_season')
        done()
      })
    })

    it("should make a request on save with division_id and game_type", function(done) {
      standingsPref = new ngin.StandingsPreference({division_id:1, game_type:'regular_season'}, {fetched:true})
      standingsPref.save(function(err, standingsPref, resp) {
        assert(!err)
        assert(!!standingsPref)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/divisions/1/standings_preferences/regular_season')
        done()
      })
    })

    it("should make a request on save with flight_id", function(done) {
      standingsPref = new ngin.StandingsPreference({flight_id:1}, {fetched:true})
      standingsPref.save(function(err, standingsPref, resp) {
        assert(!err)
        assert(!!standingsPref)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/flights/1/standings_preferences')
        done()
      })
    })

    it('should throw on destroy with division_id and game_type', function(done) {
      standingsPref = new ngin.StandingsPreference({division_id:1, game_type:'regular_season'}, {fetched:true})
      assert.throws(function(){
        standingsPref.destroy(done)
      }, Error)
      done()
    })

    it('should throw on destroy with flight_id', function(done) {
      standingsPref = new ngin.StandingsPreference({flight_id:1}, {fetched:true})
      assert.throws(function(){
        standingsPref.destroy(done)
      }, Error)
      done()
    })

  })

})
