var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Official Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Official Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Official.create({id:1}, function(err, venue, data, resp) {
        assert(!err)
        assert(!!venue)
        assert.equal(resp.req.method, 'GET')
        assert.equal(venue.metadata.url, '/officials/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Official.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/officials')
        done()
      })
    })
  })

  describe('Official Instance', function() {

    var testOfficial

    beforeEach(function() {
      testOfficial = ngin.Official.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      testOfficial.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/officials/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete testOfficial.id
      testOfficial.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/officials')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      testOfficial.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/officials/1')
        done()
      })
    })

  })

})
