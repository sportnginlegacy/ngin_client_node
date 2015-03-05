"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Game Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Game Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Game.create({id:1}, function(err, game, data, resp) {
        assert(!err)
        assert(!!game)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/games/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Game.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/games')
        done()
      })
    })
  })

  describe('Game Instance', function() {

    var game

    beforeEach(function() {
      game = ngin.Game.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      game.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/games/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete game.id
      game.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/games')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      game.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/games/1')
        done()
      })
    })

    it('should make requests on gameSheet with ID', function(done) {
      game.gameSheet(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/games/1/game_sheet')
        done()
      })
    })

    it('should make requests on rebuildFromPlayActions with ID', function(done) {
      game.rebuildFromPlayActions(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/games/1/rebuildFromPlayActions')
        done()
      })
    })

  })

})
