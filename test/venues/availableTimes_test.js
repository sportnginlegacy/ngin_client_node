var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testAvailableTimes

describe('AvailableTimes Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('AvailableTimes Instance', function() {

    var available_times

    beforeEach(function() {
      available_times = ngin.AvailableTimes.create({venue_id:1}, {fetched:true})
    })

    it("should make a request on create with ID", function(done) {
      available_times.fetch(function(err, availableTimes, resp) {
        assert(!err)
        assert(!!availableTimes)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/venues/1/available_times')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      available_times.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/venues/1/available_times')
        done()
      })
    })

  })

})
