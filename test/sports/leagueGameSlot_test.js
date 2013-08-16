"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('LeagueGameSlot Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('LeagueGameSlot Class', function() {

    it('should make requests on list with season_id', function(done) {
      ngin.LeagueGameSlot.list({season_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/league_schedules?season_id=1')
        done()
      })
    })

    it('should make requests on list with game_slot_id', function(done) {
      ngin.LeagueGameSlot.list({game_slot_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/league_schedules?game_slot_id=1')
        done()
      })
    })

    it('should make requests on update', function(done) {
      ngin.LeagueGameSlot.update({league_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/league_schedules')
        done()
      })
    })

    it('should fail on update without a league_id', function(done) {
      ngin.LeagueGameSlot.update({}, function(err, data, resp) {
        assert(err)
        assert(!resp)
        done()
      })
    })

    it('should make requests on export with season_id', function(done) {
      ngin.LeagueGameSlot.export({season_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/league_schedules.csv?season_id=1')
        done()
      })
    })

    it('should make requests on export with accept:text/csv', function(done) {
      ngin.LeagueGameSlot.export({season_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.getHeader('Accept'), 'application/vnd.stat-ngin.v2,text/csv')
        done()
      })
    })

  })

  describe('LeagueGameSlot Instance', function() {

    var gameslot

    beforeEach(function() {
      gameslot = ngin.LeagueGameSlot.create({id:1}, {fetched:true})
    })

    it('should make requests on fetch with ID', function(done) {
      gameslot.fetch({id: gameslot.id}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/league_schedules/1')
        done()
      })
    })

    it('should make requests on save with ID', function(done) {
      gameslot.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/league_schedules/1')
        done()
      })
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        gameslot.delete(done)
      }, Error)
      done()
    })

    it('should make a request for scheduling conflicts with league_id', function(done) {
      gameslot.getConflicts({league_id:1}, function(err, schedulingConflicts, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/scheduling_conflicts?league_id=1&game_slot_id=1')
        done()
      })
    })

  })

})
