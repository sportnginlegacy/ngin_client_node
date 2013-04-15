var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('Reservation Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  it('should throw on create', function(done) {
    assert.throws(function(){
      tbc.create(done)
    }, Error)
    done()
  })

  it('should make requests on list', function(done) {
    ngin.Reservation.list({query: {tournament_id:1}}, function(err, data, resp) {
      assert(!err)
      assert(!!resp)
      assert.equal(resp.req.method, 'GET')
      assert.equal(resp.req.path, '/reservations?tournament_id=1')
      done()
    })
  })

})
