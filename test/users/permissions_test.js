"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Permission Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Permission Class', function() {

    it("should make a request on list with url", function(done) {
      var url = 'http://localhost:1337/permissions/1'
      ngin.Permission.list({url:url}, function(err, data, resp) {
        assert(!err)
        assert(!!data)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/permissions/1')
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

  describe('Permission Instance', function() {

    var permisison

    before(function() {
      permisison = new ngin.Permission({id:1}, {fetched:true})
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
