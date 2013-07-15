"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Bracket Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Bracket Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Bracket.create({id:1}, function(err, bracket, data, resp) {
        assert(!err)
        assert(!!bracket)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/brackets/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Bracket.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/brackets')
        done()
      })
    })

  })

  describe('Bracket Instance', function() {

    var bracket

    beforeEach(function() {
      bracket = ngin.Bracket.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      bracket.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/brackets/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete bracket.id
      bracket.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/brackets')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      bracket.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/brackets/1')
        done()
      })
    })

  })

})
