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

    it ('should remove undefined paramaters from query', function(done) {
      var callback = sinon.spy()
      var FakeModel = { sync : sinon.spy() }
      ngin.Model.list.call(FakeModel, {
        url:'/test',
        query: {
          zero:0,
          undef:undefined,
          nil:null
        }
      }, callback)
      assert(FakeModel.sync.calledOnce, 'FakeModel.sync not calledOnce')
      assert.deepEqual(FakeModel.sync.getCall(0).args[2], {url:'/test', query:{zero:0}})
      done()
    })

  })
})
