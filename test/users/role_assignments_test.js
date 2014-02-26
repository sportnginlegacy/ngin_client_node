"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Role Assignment Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('RoleAssignment Class', function() {

    it("should make a request on list with url", function(done) {
      var url = 'http://localhost:1337/role_assignments/1'
      ngin.RoleAssignment.list({url:url}, function(err, data, resp) {
        assert(!err)
        assert(!!data)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/role_assignments/1')
        done()
      })
    })

    it('should throw on list without url', function(done) {
      assert.throws(function(){
        ngin.Permisison.list({}, done)
      }, Error)
      done()
    })

  })

  describe('RoleAssignment Instance', function() {

    var permisison

    before(function() {
      permisison = new ngin.RoleAssignment({id:1}, {fetched:true})
    })

    it('should throw on fetch', function(done) {
      assert.throws(function(){
        permisison.fetch(done)
      }, Error)
      done()
    })

    it('should throw on save', function(done) {
      assert.throws(function(){
        permisison.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        permisison.delete(done)
      }, Error)
      done()
    })

  })

})
