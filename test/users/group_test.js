"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Group Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Group Class', function() {

    describe('list', function() {

      it('should make requests', function(done) {
        var group = ngin.Group.list({owner_id:1, owner_type:'org'}, function(err, groups, resp) {
          assert(!err)
          assert(!!groups)
          assert.equal(resp.req.method, 'GET')
          assert.equal(resp.req.path, '/groups?owner_id=1&owner_type=org')
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

    var testGroup

    beforeEach(function() {
      testGroup = ngin.Group.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      testGroup.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/groups/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete testGroup.id
      testGroup.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/groups')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      testGroup.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/groups/1')
        done()
      })
    })

    it('should make requests on personas', function(done) {
      testGroup.personas(function(err, personas, resp) {
        assert(!err)
        assert(!!personas)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/groups/1/personas')
        done()
      })
    })

    it('should make request to add_personas with personaId', function(done) {
      testGroup.addPersona(1, function(err, personas, resp) {
        assert(!err)
        assert(!!personas)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/groups/1/add_persona/1')
        done()
      })
    })

    it('should make request to remove_personas with personaId', function(done) {
      testGroup.removePersona(1, function(err, personas, resp) {
        assert(!err)
        assert(!!personas)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/groups/1/remove_persona/1')
        done()
      })
    })

  })

})
