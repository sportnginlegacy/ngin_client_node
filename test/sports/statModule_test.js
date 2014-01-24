"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('StatModule Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('StatModule Class', function() {

    it("should throw on list", function(done) {
      assert.throws(function() {
        ngin.StatModule.list({}, done)
      }, Error)
      done()
    })

  })

  describe('StatModule Instance', function() {

    var statModule

    beforeEach(function() {
      statModule = new ngin.StatModule({sport_id:1}, {fetched:true})
    })

    it("should make a request on fetch", function(done) {
      statModule.fetch(function(err, statModule, resp) {
        assert(!err)
        assert(!!statModule)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/stat_modules')
        done()
      })
    })

    it('should throw on save', function(done) {
      assert.throws(function(){
        statModule.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        statModule.delete(done)
      }, Error)
      done()
    })

  })

})
