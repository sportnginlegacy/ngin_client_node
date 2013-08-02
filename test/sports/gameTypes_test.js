"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('GameTypes Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('GameTypes Class', function() {

    it('should make requests on list', function(done) {
      ngin.GameTypes.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/game_types')
        done()
      })
    })
  })

  describe('GameTypes Instance', function() {

    var testGameTypes

    beforeEach(function() {
      testGameTypes = ngin.GameTypes.create({id: 1}, {fetched:true})
    })

    it('should throw on fetch', function(done) {
      assert.throws(function() {
        testGameTypes.fetch(done)
      }, Error)
      done()
    })

    it('should throw on save', function(done) {
      assert.throws(function() {
        testGameTypes.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function() {
        testGameTypes.delete(done)
      }, Error)
      done()
    })

  })

})
