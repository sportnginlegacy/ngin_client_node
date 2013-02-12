var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testSubvenue

describe('Subvenue Model', function() {

  beforeEach(function(done) {
    server = Server()
    done()
  })

  afterEach(function(done) {
    server.close(done)
  })

  it('should make requests on create with ID', function(done) {
    ngin.Subvenue.list({venue_id:1}, function(err, subvenue, opts) {
      assert(!err)
      assert(!!subvenue)
      assert.equal(opts.req.path, '/venues/1/subvenues')
      done()
    })
  })

})