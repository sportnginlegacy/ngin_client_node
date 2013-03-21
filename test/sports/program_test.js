"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Program Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Program Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Program.create({id:1}, function(err, program) {
        assert(!err)
        assert(!!program)
        assert.equal(program.metadata.url, '/programs/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Program.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/programs')
        done()
      })
    })
  })

  describe('Program Instance', function() {

    var program

    beforeEach(function() {
      program = ngin.Program.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      program.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/programs/1')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      program.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.path, '/programs/1')
        done()
      })
    })

  })

})
