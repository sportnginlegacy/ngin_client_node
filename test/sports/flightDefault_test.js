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

  beforeEach(function(done) {
    server = Server()
    ngin.FlightDefault.create({tournament_id: 1}, function(err, flightDefault) {
      testFlightDefault = flightDefault
    })
    done()
  })

  afterEach(function(done) {
    server.close(done)
  })

  it('should make requests on fetch with ID', function(done) {
    testFlightDefault.fetch({}, function(err, flightDefault, opts) {
      assert(!err)
      assert(!!flightDefault)
      assert.equal(flightDefault.metadata.url, '/tournaments/1/flight_defaults')
      done()
    })
  })

  it('should make requests on save', function(done) {
    testFlightDefault.save({}, function(err, flightDefault, opts) {
      assert(!err)
      assert(!!flightDefault)
      done()
    })
  })
})