"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('StandingsDefault Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('StandingsDefault Class', function() {

    it("should not throw on create without ID", function(done) {
      assert.doesNotThrow(function(){
        ngin.StandingsDefault.create({key:'val'})
      })
      done()
    })

    it("should throw on list", function(done) {
      assert.throws(function() {
        ngin.StandingsDefault.list({}, done)
      }, Error)
      done()
    })

  })

  describe('StandingsDefault Instance', function() {

    var standingsDefault

    beforeEach(function() {
      standingsDefault = new ngin.StandingsDefault({tournament_id:1}, {fetched:true})
    })

    it("should make a request on fetch with tournament_id", function(done) {
      standingsDefault.fetch(function(err, standingsDefault, resp) {
        assert(!err)
        assert(!!standingsDefault)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournaments/1/standings_defaults')
        done()
      })
    })

    it("should make a request on save with tournament_id", function(done) {
      standingsDefault.save(function(err, standingsDefault, resp) {
        assert(!err)
        assert(!!standingsDefault)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/tournaments/1/standings_defaults')
        done()
      })
    })

    it("should make a request on save with league_id", function(done) {
      standingsDefault = new ngin.StandingsDefault({league_id:5,game_type:'some_game_type'}, {fetched:true})
      standingsDefault.save(function(err, standingsDefault, resp) {
        assert(!err)
        assert(!!standingsDefault)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/leagues/5/standings_defaults/some_game_type')
        done()
      })
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        standingsDefault.delete(done)
      }, Error)
      done()
    })

  })

})
