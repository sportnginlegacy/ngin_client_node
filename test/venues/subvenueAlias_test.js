var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))
var server

describe('Subvenue Alias Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('Subvenue Alias Class', function() {

    it('should make requests on index with `org_id`', function(done) {
      ngin.SubvenueAlias.list({org_id:1}, function(err, data, resp) {
        assert(!err)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subvenue_aliases?org_id=1')
        done()
      })
    })

    it('should make requests on index with `org_id` and `aka`', function(done) {
      ngin.SubvenueAlias.list({query: {org_id:1, aka: 'VENU1,VENU2,VENU3'}}, function(err, data, resp) {
        assert(!err)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/subvenue_aliases?org_id=1&aka=VENU1%2CVENU2%2CVENU3')
        done()
      })
    })
  })

  describe('Subvenue Instance', function() {

    var subvenueAlias

    beforeEach(function() {
      subvenueAlias = ngin.SubvenueAlias.create({id:2, org_id: 1, subvenue_id:1}, {fetched:true})
    })

    it('should make requests on save without ID', function(done) {
      delete subvenueAlias.id
      subvenueAlias.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/subvenue_aliases')
        done()
      })
    })

    it('should make requests on destroy with ID', function(done) {
      subvenueAlias.destroy(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'DELETE')
        assert.equal(resp.req.path, '/subvenues/1/subvenue_aliases/2')
        done()
      })
    })
  })

})