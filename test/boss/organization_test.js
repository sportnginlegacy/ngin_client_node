"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Organization Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Organization Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Organization.create({id:1}, function(err, organization, data, resp) {
        assert(!err)
        assert(!!organization)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/organizations/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Organization.list({}, function(err, org, resp) {
        assert(!err)
        assert(!!org)
        assert.equal(resp.req.method, 'GET')
        assert.equal(JSON.parse(resp.body).metadata.url, '/organizations/all')
        done()
      })
    })

    it('should make requests on mine', function(done) {
      ngin.Organization.mine({}, function(err, org, resp) {
        assert(!err)
        assert(!!org)
        assert.equal(resp.req.method, 'GET')
        assert.equal(JSON.parse(resp.body).metadata.url, '/organizations/mine')
        done()
      })
    })

  })

  describe('Organization Instance', function() {

    var testOrg

    before(function() {
      testOrg = new ngin.Organization({id:1}, {fetched:true})
    })

    it('should throw on save', function(done) {
      assert.throws(function(){
        testOrg.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        testOrg.delete(done)
      }, Error)
      done()
    })

  })

})
