"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('GameSlot Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('GameSlot Class', function() {

    it('should make requests on list with flight_id', function(done) {
      ngin.GameSlot.list({flight_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournament_schedules?flight_id=1')
        done()
      })
    })

    it('should make requests on list with flight_stage_id', function(done) {
      ngin.GameSlot.list({flight_stage_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournament_schedules?flight_stage_id=1')
        done()
      })
    })

    it('should make requests on list with game_slot_id', function(done) {
      ngin.GameSlot.list({game_slot_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournament_schedules?game_slot_id=1')
        done()
      })
    })

    it('should make requests on update', function(done) {
      ngin.GameSlot.update({tournament_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/tournament_schedules')
        done()
      })
    })

    it('should fail on update without a tournament_id', function(done) {
      ngin.GameSlot.update({}, function(err, data, resp) {
        assert(err)
        assert(!resp)
        done()
      })
    })

    it('should make requests on export with flight_id', function(done) {
      ngin.GameSlot.export({flight_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournament_schedules.csv?flight_id=1')
        done()
      })
    })

  })

  describe('GameSlot Instance', function() {

    var gameslot

    beforeEach(function() {
      gameslot = ngin.GameSlot.create({id:1}, {fetched:true})
    })

    it('should make requests on fetch with ID', function(done) {
      gameslot.fetch({id: gameslot.id}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/tournament_schedules/1')
        done()
      })
    })

    it('should make requests on save with ID', function(done) {
      gameslot.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/tournament_schedules/1')
        done()
      })
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        gameslot.delete(done)
      }, Error)
      done()
    })

    it('should make a request for scheduling conflicts with tournament_id', function(done) {
      gameslot.getConflicts({tournament_id:1}, function(err, schedulingConflicts, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/scheduling_conflicts?tournament_id=1&game_slot_id=1')
        done()
      })
    })

  })

})
