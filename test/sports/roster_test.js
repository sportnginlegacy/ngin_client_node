"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('Roster Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Roster Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.Roster.create({id:1}, function(err, roster, data, resp) {
        assert(!err)
        assert(!!roster)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/rosters/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.Roster.list({season_id:1, team_id:2}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/seasons/1/teams/2/rosters')
        done()
      })
    })
  })

  describe('Roster Instance', function() {

    var roster

    beforeEach(function() {
      roster = ngin.Roster.create({id:1}, {fetched:true})
    })

    it('should throw on save', function(done) {
      assert.throws(function(){
        roster.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        roster.delete(done)
      }, Error)
      done()
    })

  })

})
