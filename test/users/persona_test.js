"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testPersona

describe('Persona Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.Persona.create({id:1}, function(err, persona) {
      testPersona = persona
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Persona Class', function() {

    describe('list', function() {

      it('should make rquests', function(done) {
        var persona = ngin.Persona.list({org_id:1}, function(err, personas, resp) {
          assert(!err)
          assert(!!personas)
          assert.equal(JSON.parse(resp.body).metadata.url, '/personas?owner_type=organization&owner_id=' + persona.org_id)
          done()
        })
      })
    })
  })
})
