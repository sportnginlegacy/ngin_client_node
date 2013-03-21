"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Game Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Game Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Game.create({id:1}, function(err, game) {
        assert(!err)
        assert(!!game)
        assert.equal(game.metadata.url, '/games/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Game.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
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
        assert.equal(resp.req.path, '/games/1')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      game.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/games/1')
        done()
      })
    })

  })

})
