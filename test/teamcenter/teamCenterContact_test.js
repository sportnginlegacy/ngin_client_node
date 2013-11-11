"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Team Center Contact Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Team Center Contact Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.TeamCenterContact.create({id:1, teamcenter_team_id: 2, teamcenter_member_id: 3}, function(err, contact, data, resp) {
        assert(!err)
        assert(!!contact)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/teams/2/members/3/contacts/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.TeamCenterContact.list({teamcenter_team_id: 2, teamcenter_member_id: 3}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/teams/2/members/3/contacts')
        done()
      })
    })
  })

  describe('Team Center Contact Instance', function() {

    var contact

    beforeEach(function() {
      contact = ngin.TeamCenterContact.create({id:1, teamcenter_team_id:2, teamcenter_member_id: 3}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      contact.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/teams/2/members/3/contacts/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete contact.id
      contact.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/teams/2/members/3/contacts')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      contact.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/teams/2/members/3/contacts/1')
        done()
      })
    })

  })

})
