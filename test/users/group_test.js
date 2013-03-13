"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testGroup

describe('Group Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.Group.create({id:1}, function(err, group) {
      testGroup = group
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('Group Class', function() {

    describe('list', function() {

      it('should make requests', function(done) {
        var group = ngin.Group.list({owner_id:1, owner_type:'org'}, function(err, groups, resp) {
          assert(!err)
          assert(!!groups)
          assert.equal(JSON.parse(resp.body).metadata.url, '/groups?owner_id=1&owner_type=org')
          done()
        })
      })

      it('should error without owner_type option', function(done) {
        ngin.Group.list({owner_id:1}, function(err){
          assert(!!err)
          done()
        })
      })

      it('should error without owner_id option', function(done) {
        ngin.Group.list({owner_type:'x'}, function(err){
          assert(!!err)
          done()
        })
      })

    })

  })

  describe('Group Instance', function() {

    it('should make requests on personas', function(done) {
      testGroup.personas(function(err, personas, resp) {
        assert(!err)
        assert(!!personas)
        assert.equal(JSON.parse(resp.body).metadata.url, '/groups/1/personas')
        done()
      })
    })

    it('should make request to add_personas with personaId', function(done) {
      testGroup.add_persona(1, function(err, personas, resp) {
        assert(!err)
        assert(!!personas)
        assert.equal(JSON.parse(resp.body).metadata.url, '/groups/1/add_persona/1')
        done()
      })
    })

    it('should make request to remove_personas with personaId', function(done) {
      testGroup.remove_persona(1, function(err, personas, resp) {
        assert(!err)
        assert(!!personas)
        assert.equal(JSON.parse(resp.body).metadata.url, '/groups/1/remove_persona/1')
        done()
      })
    })

  })

})
