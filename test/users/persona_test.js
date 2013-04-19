"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Persona Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('list', function(){

    it("should make a request on list with userID", function(done) {
      ngin.Persona.list({query:{user_id: 1}}, function(err, data, resp) {
        assert(!err)
        assert(!!data)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/personas?user_id=1')
        done()
      })
    })

    it("should make a request on list with userID", function(done) {
      ngin.Persona.list({query:{group_id: 1}}, function(err, data, resp) {
        assert(!err)
        assert(!!data)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/personas?group_id=1')
        done()
      })
    })

    it("should make a request on list with userID", function(done) {
      ngin.Persona.list({query:{owner_type: 1, owner_id: 1}}, function(err, data, resp) {
        assert(!err)
        assert(!!data)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/personas?owner_type=1&owner_id=1')
        done()
      })
    })

    it("should error on list without user_id or group_id or (owner_type and owner_id)", function(done) {
      ngin.Persona.list({}, function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

  })

  describe('Persona Instance', function() {

    var testPersona

    beforeEach(function() {
      testPersona = ngin.Persona.create({id:1}, {fetched:true})
    })

    it("should make a request for personas with personaId ", function(done){
      testPersona.fetch(function(err, permissions, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/personas/1')
        done()
      })
    })

    it("should make a put requests on save with personaId", function(done){
      testPersona.save(function(err, permissions, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/personas/1')
        done()
      })
    })

    it("should make a post requests on save without personaId", function(done){
      delete testPersona.id
      testPersona.save(function(err, permissions, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/personas')
        done()
      })
    })

    it("should make a requests on destroy with personaId", function(done){
      testPersona.destroy(function(err, permissions, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/personas/1')
        done()
      })
    })

    it("should make a request for permissions with personaId ", function(done){
      testPersona.permissions(function(err, permissions, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/personas/1/permissions')
        done()
      })
    })

    it("should make a request for groups with personaId ", function(done){
      testPersona.groups(function(err, groups, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/personas/1/groups')
        done()
      })
    })

    it("should make a request on removeFromOrg with orgID", function(done){
      testPersona.removeFromOrg(2, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/personas/1/Organization/2')
        done()
      })
    })

    it("should not make a request on removeFromOrg without orgID", function(done){
      testPersona.removeFromOrg(null, function(err, data, resp) {
        assert(!!err)
        assert(!resp)
        done()
      })
    })

    it("should not make a request on removeFromOrg without persona.id", function(done){
      delete testPersona.id
      testPersona.removeFromOrg(2, function(err, data, resp) {
        assert(!!err)
        assert(!resp)
        done()
      })
    })

  })

})
