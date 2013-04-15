"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Subseason Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Subseason Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Subseason.create({id:1}, function(err, subseason, data, resp) {
        assert(!err)
        assert(!!subseason)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subseasons/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Subseason.list({season_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subseasons?season_id=1')
        done()
      })
    })
  })

  describe('Subseason Instance', function() {

    var testSubseason

    beforeEach(function() {
      testSubseason = ngin.Subseason.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      testSubseason.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/subseasons/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete testSubseason.id
      testSubseason.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/subseasons')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      testSubseason.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/subseasons/1')
        done()
      })
    })

    it('should make requests on addTeam with ID and teamID', function(done) {
      testSubseason.addTeam(1, function(err, subseason, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/subseasons/1/add_team/1')
        done()
      })
    })

    it('should make requests on removeTeam with ID and teamID', function(done) {
      testSubseason.removeTeam(1, function(err, subseason, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/subseasons/1/remove_team/1')
        done()
      })
    })

    it('should make requests on addDivision with ID and divisionID', function(done) {
      testSubseason.addDivision(1, function(err, subseason, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/subseasons/1/add_division/1')
        done()
      })
    })

    it('should make requests on removeDivision with ID and divisionID', function(done) {
      testSubseason.removeDivision(1, function(err, subseason, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/subseasons/1/remove_division/1')
        done()
      })
    })

    it('should make requests on standings with subseasonID', function(done) {
      testSubseason.standings(function(err, subseason, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subseasons/1/standings')
        done()
      })
    })

    it('should make requests on standingsPreference with subseasonID', function(done) {
      testSubseason.standingsPreference(function(err, subseason, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subseasons/1/standings_preferences')
        done()
      })
    })

    it('should make requests on teams with subseasonID', function(done) {
      testSubseason.teams(function(err, subseason, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subseasons/1/teams')
        done()
      })
    })

  })

})
