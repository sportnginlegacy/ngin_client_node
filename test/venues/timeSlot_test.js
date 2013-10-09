var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))
var server

describe('GameAssignment Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('TimeSlot Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.TimeSlot.create({id:1}, function(err, venue, data, resp) {
        assert(!err)
        assert(!!venue)
        assert.equal(resp.req.method, 'GET')
        assert.equal(venue.metadata.url, '/time_slots/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.TimeSlot.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/time_slots')
        done()
      })
    })

    it('should make requests on Update', function(done) {
      ngin.TimeSlot.update(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/time_slots')
        done()
      })
    })
  })

  describe('TimeSlot Instance', function() {

    var testTimeSlot

    beforeEach(function() {
      testTimeSlot = ngin.TimeSlot.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      testTimeSlot.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/time_slots/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete testTimeSlot.id
      testTimeSlot.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/time_slots')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      testTimeSlot.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/time_slots/1')
        done()
      })
    })

  })

})
