"use strict"
var assert = require('assert')
var sinon = require('sinon')

var http = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('PlayAction Model', function() {
  before(function(done) {
    server = http(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('PlayAction Class', function() {

    it('should fetch on create with id', function(done) {
      ngin.PlayAction.create({ id: 1 }, function(err, playAction, data, resp) {
        assert(!err)
        assert(!!playAction)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/play_actions/1')
        done()
      })
    })

    // AND game_id?
    it('should make requests on list with play_id', function(done) {
      ngin.PlayAction.list({ play_id: 1 }, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/play_actions?play_id=1')
        done()
      })
    })

    it('should make error on list without play_id', function(done) {
      ngin.PlayAction.list({}, function(err, data, resp) {
        assert(err)
        assert(!data)
        assert(!resp)
        done()
      })
    })

  })

})
