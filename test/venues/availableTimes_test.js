var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('AvailableTimes Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  it('should throw on list', function(done) {
    assert.throws(function(){
      tbc.list(done)
    }, Error)
    done()
  })

  describe('AvailableTimes Instance', function() {

    var testAvailableTimes

    beforeEach(function() {
      testAvailableTimes = ngin.AvailableTimes.create({venue_id:1}, {fetched:true})
    })

    it("should make a request on create with ID", function(done) {
      testAvailableTimes.fetch(function(err, availableTimes, resp) {
        assert(!err)
        assert(!!availableTimes)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/venues/1/available_times')
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      testAvailableTimes.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'PUT')
        assert.equal(resp.req.path, '/venues/1/available_times')
        done()
      })
    })

    it('should throw on delete', function(done) {
      assert.throws(function(){
        tbc.delete(done)
      }, Error)
      done()
    })

  })

})
