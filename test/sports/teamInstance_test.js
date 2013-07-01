"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('TeamInstance Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('TeamInstance Class', function() {

    it('should make requests on list with subseason_id', function(done) {
      ngin.TeamInstance.list({subseason_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subseasons/1/teams')
        done()
      })
    })

    it('should make requests on list with season_id', function(done) {
      ngin.TeamInstance.list({season_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/seasons/1/teams')
        done()
      })
    })

    it('should make requests on list with team_id', function(done) {
      ngin.TeamInstance.list({team_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/teams/1/team_instances')
        done()
      })
    })

  })

  describe('TeamInstance Instance', function() {

    var subseasonTeamInstance
    var seasonTeamInstance

    beforeEach(function() {
      subseasonTeamInstance = ngin.TeamInstance.create({subseason_id:1, team_id:2}, {fetched:true})
      seasonTeamInstance = ngin.TeamInstance.create({season_id:1, team_id:2}, {fetched: true})
    })

    it('should make requests on show with teamID', function(done) {
      subseasonTeamInstance.fetch(function(err, ti, resp){
        assert(!err)
        assert(!!ti)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subseasons/1/teams/2')
        done()
      })
    })

    it('should make requests on save with teamID and subseasonID', function(done) {
      subseasonTeamInstance.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/subseasons/1/teams/2')
        done()
      })
    })

    it('should make requests on save with teamID and seasonID', function(done) {
      seasonTeamInstance.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/seasons/1/teams/2')
        done()
      })
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        testTeamInstance.delete(done)
      }, Error)
      done()
    })

  })

})
