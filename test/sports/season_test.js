"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Season Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Season Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Season.create({id:1}, function(err, season, data, resp) {
        assert(!err)
        assert(!!season)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/seasons/1')
        done()
      })
    })

    it('should make requests on list with league_id', function(done) {
      ngin.Season.list({league_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/seasons?league_id=1')
        done()
      })
    })

    it('should make requests on list with tournament_id', function(done) {
      ngin.Season.list({tournament_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/seasons?tournament_id=1')
        done()
      })
    })

    it('should fail to make requests on list with required args', function(done) {
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
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/seasons/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete season.id
      season.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/seasons')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      season.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/seasons/1')
        done()
      })
    })


    it('should make requests on addTeam with ID and teamID', function(done) {
      season.addTeam(1, function(err, subseason, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/seasons/1/add_team/1')
        done()
      })
    })

    it('should make requests on removeTeam with ID and teamID', function(done) {
      season.removeTeam(1, function(err, subseason, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/seasons/1/remove_team/1')
        done()
      })
    })

    it('should make requests on teams with seasonID', function(done) {
      season.teams(function(err, season, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/seasons/1/teams')
        done()
      })
    })

    it('should make requests on schedule with seasonID', function(done) {
      season.schedule(function(err, season, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/league_schedules?season_id=1')
        done()
      })
    })

    it('should make requests on subseasons with seasonID', function(done) {
      season.subseasons(function(err, season, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subseasons?season_id=1')
        done()
      })
    })

    it('should make requests on standings with seasonID', function(done) {
      season.standings(function(err, season, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/seasons/1/standings')
        done()
      })
    })

  })

})
