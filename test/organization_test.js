var assert = require('assert')
var sinon = require('sinon')

var Server = require('./fixtures/http.js')
var NginClient = require('../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testOrg

describe('Organization Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.Organization.create({id:1}, function(err, org) {
      testOrg = org
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })
  describe('Organization Instance', function(){
    it('should make requests on mine with userID', function(done) {
      testOrg.mine(1, function(err, org, opts){
        assert(!err)
        assert(!!opts)
        assert.equal(opts.req.path, '/organizations/mine/1')
        done()
      })
    })
  })

})