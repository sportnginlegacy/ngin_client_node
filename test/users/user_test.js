"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testUser

describe('User Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.User.create({id:1}, function(err, user) {
      testUser = user
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('User Instance', function() {
    it("should make a request for personas with userId ", function(done){
      testUser.personas(function(err, personas, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/users/1/personas')
        done()
      })
    })

    it("should make a request for groups with userId ", function(done){
      testUser.groups(function(err, groups, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/users/1/groups')
        done()
      })
    })
  })

})