"use strict"
var assert = require('assert')
var sinon = require('sinon')

var http = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Play Model', function() {
  before(function(done) {
    server = http(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Play Class', function() {

    it('should fetch on create with id', function(done) {
      ngin.Play.create({ id: 1 }, function(err, play, data, resp) {
        assert(!err)
        assert(!!play)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/plays/1')
        done()
      })
    })

    it('should make requests on list with game_id', function(done) {
      ngin.Play.list({ game_id: 1 }, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/plays?game_id=1')
        done()
      })
    })

    it('should make error on list without game_id', function(done) {
      ngin.Play.list({}, function(err, data, resp) {
        assert(err)
        assert(!data)
        assert(!resp)
        done()
      })
    })

  })

  describe('Play Instance', function() {

    var testPlay

    beforeEach(function() {
      testPlay = ngin.Play.create({ id: 1 }, { fetched: true })
    })

    it('should make requests on save with ID', function(done) {
      testPlay.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/plays/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete testPlay.id
      testPlay.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/plays')
        done()
      })
    })

  })

})

