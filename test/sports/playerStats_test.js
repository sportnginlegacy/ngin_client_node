"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('PlayerStats Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('PlayerStats Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.PlayerStats.create({id:1}, function(err, result, data, resp) {
        console.log(err)
        assert(!err)
        assert(!!result)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/game_player_stats/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.PlayerStats.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/game_player_stats')
        done()
      })
    })

  })

  describe('PlayerStats Instance', function() {

    var obj

    beforeEach(function() {
      obj = ngin.PlayerStats.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      obj.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/game_player_stats/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete obj.id
      obj.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/game_player_stats')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      obj.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/game_player_stats/1')
        done()
      })
    })

  })


})
