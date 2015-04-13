"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Position Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Position Class', function() {

    it("should make requests on list with sport_id", function(done) {
      ngin.Position.list({sport_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!data)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/sports/1/positions')
        done()
      })
    })

    it("should error on list without sport_id", function(done) {
      ngin.Position.list({}, function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

  })

  describe('Position Instance', function() {

    var tbc

    beforeEach(function() {
      tbc = new ngin.Position({id:1}, {fetched:true})
    })

    it('should throw on fetch', function(done) {
      assert.throws(function(){
        tbc.fetch(done)
      }, Error)
      done()
    })

    it('should throw on save', function(done) {
      assert.throws(function(){
        tbc.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        tbc.delete(done)
      }, Error)
      done()
    })

  })

})
