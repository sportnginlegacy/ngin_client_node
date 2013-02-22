"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testPool

describe('Pool Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.Pool.create({id:1}, function(err, pool) {
      testPool = pool
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Division Instance', function() {
    it("should make a request for standings with ID and subseasonID ", function(done){
      testPool.standings(function(err, pool, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/pools/1/standings')
        done()
      })
    })

    it("should make a request for addTeam with ID and teamID", function(done){
      testPool.addTeam(1, function(err, pool, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/pools/1/add_team/1')
        done()
      })
    })

    it("should make a request for removeTeam with ID and teamID ", function(done){
      testPool.removeTeam(1, function(err, pool, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/pools/1/remove_team/1')
        done()
      })
    })
  })

})