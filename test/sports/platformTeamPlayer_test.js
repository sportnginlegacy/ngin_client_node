"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Platform Team Player Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Platform Team Player Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.PlatformTeamPlayer.create({id:1}, function(err, player, data, resp) {
        assert(!err)
        assert(!!player)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/players/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.PlatformTeamPlayer.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/players')
        done()
      })
    })
  })

  describe('Platform Team Player Instance', function() {

    var player

    beforeEach(function() {
      player = ngin.PlatformTeamPlayer.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      player.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/players/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete player.id
      player.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/players')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      player.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/players/1')
        done()
      })
    })

  })

})