"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('League Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('League Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.League.create({id:1}, function(err, league) {
        assert(!err)
        assert(!!league)
        assert.equal(league.metadata.url, '/leagues/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.League.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/leagues')
        done()
      })
    })
  })

  describe('League Instance', function() {

    var league

    beforeEach(function() {
      league = ngin.League.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      league.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/leagues/1')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      league.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/leagues/1')
        done()
      })
    })

  })

})
