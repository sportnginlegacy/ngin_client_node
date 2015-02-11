"use strict"
var assert = require('assert')
var sinon = require('sinon')

var http = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('StateChart Model', function() {

  before(function(done) {
    server = http(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('StateChart Class', function() {

    it('should fetch by (sport) id', function(done) {
      ngin.StateChart.create({id: 1}, function(err, stateChart, data, resp) {
        assert(!err)
        assert(!!stateChart)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/state_charts/1')
        done()
      })
    })

    it('should throw on list', function(done) {
      assert.throws(function() {
        ngin.StateChart.list({}, done)
      })
      done()
    })

  })

  describe('StateChart Instance', function() {

    var stateChart

    beforeEach(function() {
      stateChart = new ngin.StateChart({ id: 1 }, { fetched: true })
    })

    it('should throw on save', function(done) {
      assert.throws(function() {
        stateChart.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function() {
        stateChart.delete(done)
      }, Error)
      done()
    })

  })

})

