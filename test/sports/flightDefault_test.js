"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testFlightDefault

describe('FlightDefault Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  beforeEach(function() {
    testFlightDefault = ngin.FlightDefault.create({tournament_id: 1}, {fetched:true})
  })

  it('should make requests on fetch with ID', function(done) {
    testFlightDefault.fetch({}, function(err, flightDefault, resp) {
      assert(!err)
      assert(!!flightDefault)
      assert.equal(resp.req.method, 'GET')
      assert.equal(resp.req.path, '/tournaments/1/flight_defaults')
      done()
    })
  })

  it('should make requests on save', function(done) {
    testFlightDefault.save(function(err, flightDefault, resp) {
      assert(!err)
      assert(!!flightDefault)
      assert.equal(resp.req.method, 'PUT')
      assert.equal(resp.req.path, '/tournaments/1/flight_defaults')
      done()
    })
  })
})
