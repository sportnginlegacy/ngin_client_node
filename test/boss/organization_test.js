"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Organization Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Organization Class', function() {

    it("should throw on list", function(done) {
      assert.throws(function() {
        ngin.Organization.list({}, done)
      }, Error)
      done()
    })

    it('should make requests on mine', function(done) {
      ngin.Organization.mine(function(err, org, resp) {
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

    it('should throw on fetch', function(done) {
      assert.throws(function(){
        testOrg.fetch(done)
      }, Error)
      done()
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
