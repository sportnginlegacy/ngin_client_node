"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Password Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Password Class', function() {

    it('should throw on save', function(done) {
      assert.throws(function(){
        ngin.Password.save(done)
      }, Error)
      done()
    })

  })

  describe('Password Instance', function() {

    var password

    before(function() {
      password = new ngin.Password({
        current_password:"current_password",
        password:"password",
        password_confirmation:"password_confirmation"
      }, {fetched:true})
    })

    it('should make requests on save', function(done) {
      password.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/users/password')
        done()
      })
    })

    it('should throw on list', function(done) {
      assert.throws(function(){
        password.list(done)
      }, Error)
      done()
    })

    it('should throw on fetch', function(done) {
      assert.throws(function(){
        password.fetch(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        password.delete(done)
      }, Error)
      done()
    })

  })

})
