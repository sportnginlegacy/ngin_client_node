"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Persona Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Persona Instance', function() {

    var testPersona

    beforeEach(function() {
      testPersona = ngin.Persona.create({id:1}, {fetched:true})
    })

    it("should make a request for permissions with personaId ", function(done){
      testPersona.permissions(function(err, permissions, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/personas/1/permissions')
        done()
      })
    })

    it("should make a request for groups with personaId ", function(done){
      testPersona.groups(function(err, groups, opts) {
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/personas/1/groups')
        done()
      })
    })
  })

})
