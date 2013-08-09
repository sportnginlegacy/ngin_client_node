"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('TiebreakPreference Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('TiebreakPreference Class', function() {

    it("should not throw on create without ID", function(done) {
      assert.doesNotThrow(function(){
        ngin.TiebreakPreference.create({key:'val'})
      })
      done()
    })

    it("should throw on list", function(done) {
      assert.throws(function() {
        ngin.TiebreakPreference.list({}, done)
      }, Error)
      done()
    })

  })

  describe('TiebreakPreference Instance', function() {

    var tiebreakPref

    beforeEach(function() {
      tiebreakPref = new ngin.TiebreakPreference({}, {fetched:true})
    })

    it('should make requests on fetch with tournament_id', function(done) {
      tiebreakPref.tournament_id = 1
      tiebreakPref.fetch(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournaments/1/tiebreak_preference')
        done()
      })
    })

    it('should make requests on fetch with flight_id', function(done) {
      tiebreakPref.flight_id = 1
      tiebreakPref.fetch(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/flights/1/tiebreak_preference')
        done()
      })
    })

    it('should make requests on fetch with league_id', function(done) {
      tiebreakPref.league_id = 1
      tiebreakPref.fetch(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/leagues/1/tiebreak_preference')
        done()
      })
    })

    it('should make requests on save with tournament_id', function(done) {
      tiebreakPref.tournament_id = 1
      tiebreakPref.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/tournaments/1/tiebreak_preference')
        done()
      })
    })

    it('should make requests on save with league_id', function(done) {
      tiebreakPref.league_id = 1
      tiebreakPref.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/leagues/1/tiebreak_preference')
        done()
      })
    })

    it('should make requests on save with flight_id', function(done) {
      tiebreakPref.flight_id = 1
      tiebreakPref.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/flights/1/tiebreak_preference')
        done()
      })
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        tiebreakPref.delete(done)
      }, Error)
      done()
    })

  })

})
