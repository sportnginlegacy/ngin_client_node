"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Team Center Member Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Team Center Member Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.TeamCenterMember.create({id:1}, function(err, member, data, resp) {
        assert(!err)
        assert(!!member)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/members/1')
        done()
      })
    })

    it('should make requests on list with teamcenter_team_id', function(done) {
      ngin.TeamCenterMember.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/members?teamcenter_team_id=1')
        done()
      })
    })

    it('should make error on list without teamcenter_team_id', function(done) {
      ngin.TeamCenterMember.list({}, function(err, data, resp) {
        assert(err)
        assert(!data)
        assert(!resp)
        done()
      })
    })

  })

  describe('Team Center Player Instance', function() {

    var member

    beforeEach(function() {
      member = ngin.TeamCenterMember.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      member.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/members/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete member.id
      member.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/members')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      member.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/members/1')
        done()
      })
    })

  })

})
