var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server
var testSubvenue

describe('Subvenue Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Subvenue Class', function() {

    it('should make requests on create with `id` and `venue_id`', function(done) {
      ngin.Subvenue.create({id:2, venue_id:1}, function(err, subvenue, data, resp) {
        assert(!err)
        assert(!!subvenue)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/venues/1/subvenues/2')
        done()
      })
    })

    it('should make requests on list with `venue_id`', function(done) {
      ngin.Subvenue.list({venue_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subvenues?venue_id=1')
        done()
      })
    })

    it('should make requests on list with `tournament_id`', function(done) {
      ngin.Subvenue.list({tournament_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subvenues?tournament_id=1')
        done()
      })
    })

    it('should make requests on list with `tournament_id` and `venue_id`', function(done) {
      ngin.Subvenue.list({tournament_id:1, venue_id:1}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subvenues?tournament_id=1&venue_id=1')
        done()
      })
    })

    it('should make requests on list with `tournament_id` and undefined `venue_id`', function(done) {
      ngin.Subvenue.list({tournament_id:1, venue_id:undefined}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subvenues?tournament_id=1')
        done()
      })
    })

  })

  describe('Subvenue Instance', function() {

    var subvenue

    beforeEach(function() {
      subvenue = ngin.Subvenue.create({id:2, venue_id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      subvenue.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/venues/1/subvenues/2')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete subvenue.id
      subvenue.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/venues/1/subvenues')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      subvenue.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/venues/1/subvenues/2')
        done()
      })
    })


    it('should make requests on add_reservation with a ID and query params', function(done) {
      subvenue.addReservation({query:{reserver_type: 'Tournament', reserver_id: 1}}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/subvenues/2/reservations?reserver_type=Tournament&reserver_id=1')
        done()
      })
    })

    it('should make requests on remove_reservation with a ID and query params', function(done) {
      subvenue.removeReservation({query:{reserver_type: 'Tournament', reserver_id: 1}}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/subvenues/2/reservations?reserver_type=Tournament&reserver_id=1')
        done()
      })
    })

  })

})
