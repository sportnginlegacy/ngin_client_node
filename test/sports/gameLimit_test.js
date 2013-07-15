"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server
var testGameLimits

describe('GameLimit Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  beforeEach(function() {
    testGameLimits = ngin.GameLimits.create({tournament_id: 1}, {fetched:true})
  })

  it('should make requests on fetch with ID', function(done) {
    testGameLimits.fetch({}, function(err, flightDefault, resp) {
      assert(!err)
      assert(!!flightDefault)
      assert.equal(resp.req.method, 'GET')
      assert.equal(resp.req.path, '/tournaments/1/game_limits')
      done()
    })
  })

  it('should make requests on save', function(done) {
    testGameLimits.save(function(err, flightDefault, resp) {
      assert(!err)
      assert(!!flightDefault)
      assert.equal(resp.req.method, 'PUT')
      assert.equal(resp.req.path, '/tournaments/1/game_limits')
      done()
    })
  })
})
