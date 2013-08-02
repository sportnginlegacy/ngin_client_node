"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('User Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('User Class', function() {

    it('should make a request for logged in user', function(done) {
      ngin.User.me(function(err, model, data, resp) {
        assert(!err)
        assert(!!data)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/oauth/me')
        done()
      })
    })

  })

  describe('User Instance', function() {

    var testUser

    beforeEach(function() {
      testUser = ngin.User.create({id:1}, {fetched:true})
    })

    it("should make a request for personas with userId ", function(done){
      testUser.personas(function(err, personas, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/users/1/personas')
        done()
      })
    })

    it("should make a request for groups with userId ", function(done){
      testUser.groups(function(err, groups, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/users/1/groups')
        done()
      })
    })
  })

})
