"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Pool Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Pool Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Pool.create({id:1}, function(err, pool, data, resp) {
        assert(!err)
        assert(!!pool)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/pools/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Pool.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/pools')
        done()
      })
    })

  })

  describe('Pool Instance', function() {

    var testPool

    beforeEach(function() {
      testPool = ngin.Pool.create({id:1}, {fetched:true})
    })

    it("should make a request for standings with ID and subseasonID ", function(done){
      testPool.standings(function(err, pool, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/pools/1/standings')
        done()
      })
    })

    it("should make a request for addTeam with ID and teamID", function(done){
      testPool.addTeam(1, function(err, pool, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/pools/1/add_team/1')
        done()
      })
    })

    it("should make a request for removeTeam with ID and teamID ", function(done){
      testPool.removeTeam(1, function(err, pool, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/pools/1/remove_team/1')
        done()
      })
    })

    it('should make requests on save with ID', function(done) {
      testPool.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/pools/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete testPool.id
      testPool.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/pools')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      testPool.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/pools/1')
        done()
      })
    })

  })

})
