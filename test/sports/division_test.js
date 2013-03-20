"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Division Model', function() {

  beforeEach(function() {
    server = Server()
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Division Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Division.create({id:1}, function(err, division) {
        assert(!err)
        assert(!!division)
        assert.equal(division.metadata.url, '/divisions/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Division.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        data = JSON.parse(resp.body)
        assert.equal(data.metadata.url, '/divisions')
        done()
      })
    })

  })

  describe('Division Instance', function() {

    it("should make a request for standings with ID and subseasonID ", function(done){
      var testDivision = ngin.Division.create({id:1}, {fetched:true})
      testDivision.standings(1, function(err, division, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/subseasons/1/divisions/1/standings')
        done()
      })
    })

    it('should make requests on save with ID', function(done) {
      var division = ngin.Division.create({id:1}, {fetched:true})
      division.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        data = JSON.parse(resp.body)
        assert.equal(data.metadata.url, '/divisions/1')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      var division = ngin.Division.create({id:1}, {fetched:true})
      division.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        data = JSON.parse(resp.body)
        assert.equal(data.metadata.url, '/divisions/1')
        done()
      })
    })

  })

})
