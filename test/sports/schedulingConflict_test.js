"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('SchedulingConflict Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('SchedulingConflict Class', function() {

    var params = {tournament_id: 1}

    it('should make requests on list with tournament_id', function(done) {
      ngin.SchedulingConflict.list({tournament_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/scheduling_conflicts?tournament_id=1')
        done()
      })
    })

    it('should make requests on list with tournament_id and game_slot_id', function(done) {
      ngin.SchedulingConflict.list({tournament_id:1, game_slot_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/scheduling_conflicts?tournament_id=1&game_slot_id=1')
        done()
      })
    })

    it('should throw error without tournament_id', function(done) {
      ngin.SchedulingConflict.list({}, function(err, data, resp) {
        assert(err)
        assert(!resp)
        done()
      })
    })

  })

  describe('SchedulingConflict Instance', function() {

    var schedulingConflict

    beforeEach(function() {
      schedulingConflict = ngin.SchedulingConflict.create({id: 1}, {fetched: true})
    })

    it('should throw on save', function(done) {
      assert.throws(function() {
        schedulingConflict.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      assert.throws(function() {
        schedulingConflict.delete(done)
      }, Error)
      done()

    })

    it('should throw on fetch', function(done) {
      assert.throws(function() {
        schedulingConflict.fetch(done)
      }, Error)
      done()
    })

  })

})
