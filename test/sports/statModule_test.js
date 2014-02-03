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

    it('should make requests on list', function(done) {
      ngin.StatModule.list({sport_id: 1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/stat_modules?sport_id=1')
        done()
      })
    })

  })

  describe('StatModule Instance', function() {

    var statModule

    beforeEach(function() {
      statModule = new ngin.StatModule({sport_id:1}, {fetched:true})
    })

    it('should throw on fetch', function(done) {
      assert.throws(function(){
        statModule.fetch(done)
      }, Error)
      done()
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
