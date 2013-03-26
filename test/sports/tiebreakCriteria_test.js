"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('TiebreakCriteria Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('TiebreakCriteria Class', function() {

    it("should make requests on list with sport_id", function(done) {
      ngin.TiebreakCriteria.list({sport_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!data)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tiebreak_criteria?sport_id=1')
        done()
      })
    })

    it("should error on list without sport_id", function(done) {
      ngin.TiebreakCriteria.list({}, function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

  })

  describe('TiebreakCriteria Instance', function() {

    var tbc

    beforeEach(function() {
      tbc = new ngin.TiebreakCriteria({id:1}, {fetched:true})
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
