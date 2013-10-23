"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Team Center Player Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Team Center Player Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.TeamCenterPlayer.create({id:1, teamcenter_team_id: 2}, function(err, player, data, resp) {
        assert(!err)
        assert(!!player)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/teams/2/players/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.TeamCenterPlayer.list({teamcenter_team_id: 2}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/teams/2/players')
        done()
      })
    })
  })

  describe('Team Center Player Instance', function() {

    var player

    beforeEach(function() {
      player = ngin.TeamCenterPlayer.create({id:1, teamcenter_team_id:2}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      player.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/teams/2/players/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete player.id
      player.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/teams/2/players')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      player.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/teams/2/players/1')
        done()
      })
    })

  })

})
