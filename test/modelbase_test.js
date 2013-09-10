"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('./fixtures/http.js')
var NginClient = require('../index')
var ngin = new NginClient(require('./fixtures/config.js'))
var Model = ngin.NginModel

var server

describe('Modelbase', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Model class', function() {

    var Model

    beforeEach(function(done) {
      Model = new ngin.Model()
      done()
    })

    it ('should return the result on parse', function(done) {
      var spy = sinon.spy()
      var mock = { result: spy }
      Model.parse(mock)()
      assert(spy.calledOnce)
      done()
    })

    it ('should return empty object on parse without arguments', function(done) {
      var result = Model.parse()
      var empty = function() {
        for (var key in result) if(key) return false
        return true
      }
      assert(empty())
      done()
    })
  })
})
