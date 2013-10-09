"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Team Center Team Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Team Center Team Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.TeamCenterTeam.create({id:1}, function(err, team, data, resp) {
        assert(!err)
        assert(!!team)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/teams/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.TeamCenterTeam.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/teams')
        done()
      })
    })

  })

  describe('Team Center Team Instance', function() {

    var testTeamCenterTeam

    beforeEach(function() {
      testTeamCenterTeam = ngin.TeamCenterTeam.create({id:1, season_id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      testTeamCenterTeam.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/teams/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete testTeamCenterTeam.id
      testTeamCenterTeam.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/teams')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      testTeamCenterTeam.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/teams/1')
        done()
      })
    })

  })

})
