"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('StatPreference Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('StatPreference Class', function() {

    it("should throw on list", function(done) {
      assert.throws(function() {
        ngin.StatPreference.list({}, done)
      }, Error)
      done()
    })

  })

  describe('StatPreference Instance', function() {

    var statPrefs

    beforeEach(function() {
      statPrefs = new ngin.StatPreference({season_id:1, game_type:'regular_season'}, {fetched:true})
    })

    it("should make a request on fetch with season_id and game_type", function(done) {
      statPrefs.fetch(function(err, statPrefs, resp) {
        console.error(err)
        assert(!err)
        assert(!!statPrefs)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/seasons/1/stat_preferences/regular_season')
        done()
      })
    })

    it("should make a request on save with season_id and game_type", function(done) {
      statPrefs.save(function(err, statPrefs, resp) {
        assert(!err)
        assert(!!statPrefs)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/seasons/1/stat_preferences/regular_season')
        done()
      })
    })

    it('should throw on destroy', function(done) {
      assert.throws(function(){
        statPrefs.destroy(done)
      }, Error)
      done()
    })

  })

})
