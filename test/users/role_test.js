"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Role Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Role Class', function() {

    it('should make requests on list', function(done) {
      ngin.Role.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/roles')
        done()
      })
    })

  })

  describe('Role Instance', function() {

    var testRole

    beforeEach(function() {
      testRole = ngin.Role.create({id:1}, {fetched:true})
    })

    it('should throw on fetch', function(done) {
      assert.throws(function(){
        testRole.fetch(done)
      }, Error)
      done()
    })

    it('should throw on save', function(done) {
      assert.throws(function(){
        testRole.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        testRole.delete(done)
      }, Error)
      done()
    })

  })

})
