"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testTeam

describe('Team Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.Team.create({id:1}, function(err, team) {
      testTeam = team
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Team Instance', function() {
    it("should make a request for standings with ID and subseasonID ", function(done){
      testTeam.standings(1, function(err, team, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/subseasons/1/teams/1/standings')
        done()
      })
    })

    it("should make a request for rosters with ID and subseasonID ", function(done){
      testTeam.roster(1, function(err, team, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/subseasons/1/teams/1/rosters')
        done()
      })
    })

    it("should make a request for instances with ID", function(done){
      testTeam.instances(function(err, team, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/teams/1/team_instances')
        done()
      })
    })
  })

})