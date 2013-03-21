"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Sport Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Sport Class', function() {

    it('should make requests on list', function(done) {
      ngin.Sport.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/sports')
        done()
      })
    })

  })

  describe('Sport Instance', function() {

    var testSport

    beforeEach(function() {
      testSport = ngin.Sport.create({id:1}, {fetched:true})
    })

    it('should throw on fetch', function(done) {
      assert.throws(function(){
        testSport.fetch(done)
      }, Error)
      done()
    })

    it('should throw on save', function(done) {
      assert.throws(function(){
        testSport.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        testSport.delete(done)
      }, Error)
      done()
    })

    it("should make a request for standings modules with id", function(done){
      testSport.standingsModules(function(err, standingsModule, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/sports/1/standings_modules')
        done()
      })
    })

  })

})
