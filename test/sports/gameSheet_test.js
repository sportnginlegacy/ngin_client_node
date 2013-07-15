"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('GameSheet Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('GameSheet Class', function() {

    it('should make requests on create with ID', function(done) {
      assert.throws (
        function() { ngin.GameSheet.create({id:1}) }
      )
      done()
    })

  })

})
