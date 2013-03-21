"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Season Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Season Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Season.create({id:1}, function(err, season) {
        assert(!err)
        assert(!!season)
        assert.equal(season.metadata.url, '/seasons/1')
        done()
      })
    })

    it('should make requests on list with league_id', function(done) {
      ngin.Season.list({league_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/seasons?league_id=1')
        done()
      })
    })

    it('should make requests on list with tournament_id', function(done) {
      ngin.Season.list({tournament_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/seasons?tournament_id=1')
        done()
      })
    })

    it('should faile to make requests on list with required args', function(done) {
      ngin.Season.list({}, function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

  })

  describe('Season Instance', function() {

    var season

    beforeEach(function() {
      season = ngin.Season.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      season.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/seasons/1')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      season.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/seasons/1')
        done()
      })
    })

  })

})
