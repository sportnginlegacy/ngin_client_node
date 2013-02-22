"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testSubseason

describe('Subseason Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.Subseason.create({id:1}, function(err, subseason) {
      testSubseason = subseason
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Subseason Instance', function() {

    it('should make requests on addTeam with ID and teamID', function(done) {
      testSubseason.addTeam(1, function(err, subseason, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/subseasons/1/add_team/1')
        done()
      })
    })

    it('should make requests on removeTeam with ID and teamID', function(done) {
      testSubseason.removeTeam(1, function(err, subseason, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/subseasons/1/remove_team/1')
        done()
      })
    })

    it('should make requests on addDivision with ID and divisionID', function(done) {
      testSubseason.addDivision(1, function(err, subseason, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/subseasons/1/add_division/1')
        done()
      })
    })

    it('should make requests on removeDivision with ID and divisionID', function(done) {
      testSubseason.removeDivision(1, function(err, subseason, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/subseasons/1/remove_division/1')
        done()
      })
    })

    it('should make requests on standings with subseasonID', function(done) {
      testSubseason.standings(function(err, subseason, opts) {
        assert.equal(opts.req.path, '/subseasons/1/standings')
        done()
      })
    })

    it('should make requests on standingsPreference with subseasonID', function(done) {
      testSubseason.standingsPreference(function(err, subseason, opts) {
        assert.equal(opts.req.path, '/subseasons/1/standings_preference')
        done()
      })
    })

    it('should make requests on teams with subseasonID', function(done) {
      testSubseason.teams(function(err, subseason, opts) {
        assert.equal(opts.req.path, '/subseasons/1/teams')
        done()
      })
    })

  })

})