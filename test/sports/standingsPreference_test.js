"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('StandingsPreference Model', function() {

  before(function() {
    server = Server()
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

    beforeEach(function() {
      standingsPref = new ngin.StandingsPreference({subseason_id:1}, {fetched:true})
    })

    it("should make a request on fetch with subseason_id", function(done) {
      standingsPref.fetch(function(err, standingsPref, resp) {
        assert(!err)
        assert(!!standingsPref)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subseasons/1/standings_preferences')
        done()
      })
    })

    it("should make a request on fetch with subseason_id and pool_id", function(done) {
      standingsPref.fetch({pool_id:2}, function(err, standingsPref, resp) {
        assert(!err)
        assert(!!standingsPref)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subseasons/1/pools/2/standings_preferences')
        done()
      })
    })

    it("should make a request on fetch with subseason_id and division_id", function(done) {
      standingsPref.fetch({division_id:2}, function(err, standingsPref, resp) {
        assert(!err)
        assert(!!standingsPref)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subseasons/1/divisions/2/standings_preferences')
        done()
      })
    })

    it('should throw on destroy', function(done) {
      assert.throws(function(){
        standingsPref.destroy(done)
      }, Error)
      done()
    })

  })

})
