"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Player Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Player Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Player.create({id:1}, function(err, player) {
        assert(!err)
        assert(!!player)
        assert.equal(player.metadata.url, '/players/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Player.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/players')
        done()
      })
    })
  })

  describe('Player Instance', function() {

    var player

    beforeEach(function() {
      player = ngin.Player.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      player.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/players/1')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      player.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/players/1')
        done()
      })
    })

  })

})
