var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))
var server

describe('GameAssignment Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('GameAssignment Class', function() {

    it('should make requests on create with ID', function(done) {
      ngin.GameAssignment.create({id:1}, function(err, venue, data, resp) {
        assert(!err)
        assert(!!venue)
        assert.equal(resp.req.method, 'GET')
        assert.equal(venue.metadata.url, '/game_assignments/1')
        done()
      })
    })

    it('should make requests on list', function(done) {
      ngin.GameAssignment.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/game_assignments')
        done()
      })
    })
  })

  describe('GameAssignment Instance', function() {

    var testGameAssignment

    beforeEach(function() {
      testGameAssignment = ngin.GameAssignment.create({id:1}, {fetched:true})
    })

    it('should make requests on save with ID', function(done) {
      testGameAssignment.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/game_assignments/1')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      delete testGameAssignment.id
      testGameAssignment.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/game_assignments')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      testGameAssignment.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/game_assignments/1')
        done()
      })
    })

  })

})
