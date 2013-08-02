"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('StandingsModule Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('StandingsModule Class', function() {

    it("should not throw on create without ID", function(done) {
      assert.doesNotThrow(function(){
        ngin.StandingsModule.create({key:'val'})
      })
      done()
    })

    it("should throw on list", function(done) {
      assert.throws(function() {
        ngin.StandingsModule.list({}, done)
      }, Error)
      done()
    })

  })

  describe('StandingsModule Instance', function() {

    var standingsModule

    beforeEach(function() {
      standingsModule = new ngin.StandingsModule({sport_id:1}, {fetched:true})
    })

    it("should make a request on create with ID", function(done) {
      standingsModule.fetch(function(err, standingsModule, resp) {
        assert(!err)
        assert(!!standingsModule)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/sports/1/standings_modules')
        done()
      })
    })

    it('should throw on save', function(done) {
      assert.throws(function(){
        standingsModule.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        standingsModule.delete(done)
      }, Error)
      done()
    })

  })

})
