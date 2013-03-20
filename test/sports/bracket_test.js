"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Bracket Model', function() {

  beforeEach(function(done) {
    server = Server()
    done()
  })

  afterEach(function(done) {
    server.close(done)
  })

  it('should make requests on create with ID', function(done) {
    ngin.Bracket.create({id:1}, function(err, bracket) {
      assert(!err)
      assert(!!bracket)
      assert.equal(bracket.metadata.url, '/brackets/1')
      done()
    })
  })

  it('should make requests on save with ID', function(done) {
    var bracket = ngin.Bracket.create({id:1}, {fetched:true})
    bracket.save(function(err, data, resp) {
      assert(!err)
      assert(!!resp)
      data = JSON.parse(resp.body)
      assert.equal(data.metadata.url, '/brackets/1')
      done()
    })
  })

  it('should make requests on destroy with ID', function(done) {
    var bracket = ngin.Bracket.create({id:1}, {fetched:true})
    bracket.destroy(function(err, data, resp) {
      assert(!err)
      assert(!!resp)
      data = JSON.parse(resp.body)
      assert.equal(data.metadata.url, '/brackets/1')
      done()
    })
  })

  it('should make requests on list', function(done) {
    ngin.Bracket.list(function(err, data, resp) {
      assert(!err)
      assert(!!resp)
      data = JSON.parse(resp.body)
      assert.equal(data.metadata.url, '/brackets')
      done()
    })
  })

})
