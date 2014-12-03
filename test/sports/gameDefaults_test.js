"use strict"
var assert = require('assert')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server
var testGameDefaults

describe('GameDefaults Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  beforeEach(function() {
    testGameDefaults = ngin.GameDefaults.create({}, {fetched:true})
  })

  it('should make requests on fetch with tournament_id', function(done) {
    testGameDefaults.fetch({tournament_id: 1}, function(err, data, resp) {
      assert(!err)
      assert(!!data)
      assert.equal(resp.req.method, 'GET')
      assert.equal(resp.req.path, '/game_defaults?tournament_id=1')
      done()
    })
  })

  it('should make requests on fetch with league_id', function(done) {
    testGameDefaults.fetch({league_id: 1}, function(err, data, resp) {
      assert(!err)
      assert(!!data)
      assert.equal(resp.req.method, 'GET')
      assert.equal(resp.req.path, '/game_defaults?league_id=1')
      done()
    })
  })

  it('should make requests on fetch with flight_id', function(done) {
    testGameDefaults.fetch({flight_id: 1}, function(err, data, resp) {
      assert(!err)
      assert(!!data)
      assert.equal(resp.req.method, 'GET')
      assert.equal(resp.req.path, '/game_defaults?flight_id=1')
      done()
    })
  })

  it('should make requests on fetch with division_id', function(done) {
    testGameDefaults.fetch({division_id: 1}, function(err, data, resp) {
      assert(!err)
      assert(!!data)
      assert.equal(resp.req.method, 'GET')
      assert.equal(resp.req.path, '/game_defaults?division_id=1')
      done()
    })
  })

  it('should throw error on fetch if no required params are found', function(done) {
    try {
      testGameDefaults.fetch({}, function(err, data, resp) {
        assert(false)
        done()
      })
    } catch(e) {
      assert(true)
      done()
    }
  })

  it('should make requests on save with tournament_id', function(done) {
    testGameDefaults.save({tournament_id: 1}, function(err, data, resp) {
      assert(!err)
      assert(!!data)
      assert.equal(resp.req.method, 'PUT')
      assert.equal(resp.req.path, '/game_defaults?tournament_id=1')
      done()
    })
  })

  it('should make requests on save with league_id', function(done) {
    testGameDefaults.save({league_id: 1}, function(err, data, resp) {
      assert(!err)
      assert(!!data)
      assert.equal(resp.req.method, 'PUT')
      assert.equal(resp.req.path, '/game_defaults?league_id=1')
      done()
    })
  })

  it('should make requests on save with flight_id', function(done) {
    testGameDefaults.save({flight_id: 1}, function(err, data, resp) {
      assert(!err)
      assert(!!data)
      assert.equal(resp.req.method, 'PUT')
      assert.equal(resp.req.path, '/game_defaults?flight_id=1')
      done()
    })
  })

  it('should make requests on save with division_id', function(done) {
    testGameDefaults.save({division_id: 1}, function(err, data, resp) {
      assert(!err)
      assert(!!data)
      assert.equal(resp.req.method, 'PUT')
      assert.equal(resp.req.path, '/game_defaults?division_id=1')
      done()
    })
  })

  it('should throw error on save if no required params are found', function(done) {
    try {
      testGameDefaults.save({}, function(err, data, resp) {
        assert(false)
        done()
      })
    } catch(e) {
      assert(true)
      done()
    }
  })

})
