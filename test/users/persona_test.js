"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Persona Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('list', function(){

    it("should make a request to /users/:user_id/personas with user_id", function(done) {
      ngin.Persona.list({user_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!data)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/users/1/personas')
        done()
      })
    })

    it("should make a request to /groups/:group_id/personas with group_id", function(done) {
      ngin.Persona.list({group_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!data)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/groups/1/personas')
        done()
      })
    })

    it("should make a request to /personas with owner_type and owner_id", function(done) {
      ngin.Persona.list({query:{owner_type: 1, owner_id: 1}}, function(err, data, resp) {
        assert(!err)
        assert(!!data)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/personas?owner_type=1&owner_id=1')
        done()
      })
    })

    it("should error on list without user_id or group_id or (owner_type and owner_id)", function() {
      assert.throws(function(){
        ngin.Persona.list({}, function(err, data, resp) {
          assert(!!err)
        })
      })
    })

  })

  describe('Persona Instance', function() {

    var testPersona

    beforeEach(function() {
      testPersona = ngin.Persona.create({id:1}, {fetched:true})
    })

    it("should make a request for personas with personaId ", function(done){
      testPersona.fetch(function(err, role_assignments, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/personas/1')
        done()
      })
    })

    it("should make a put requests on save with personaId", function(done){
      testPersona.save(function(err, role_assignments, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/personas/1')
        done()
      })
    })

    it("should make a post requests on save without personaId", function(done){
      delete testPersona.id
      testPersona.save(function(err, role_assignments, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/personas')
        done()
      })
    })

    it("should make a requests on destroy with personaId", function(done){
      testPersona.destroy(function(err, role_assignments, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/personas/1')
        done()
      })
    })

    it("should make a request for role_assignments with personaId ", function(done){
      testPersona.role_assignments(function(err, role_assignments, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/personas/1/role_assignments')
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
