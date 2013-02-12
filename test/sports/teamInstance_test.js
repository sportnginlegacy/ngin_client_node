var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testTeamInstance

describe('TeamInstance Model', function() {

  beforeEach(function(done) {
    server = Server()
    ngin.TeamInstance.create({subseason_id:1, id:1}, function(err, ti) {
      testTeamInstance = ti
      done()
    })
  })

  afterEach(function(done) {
    server.close(done)
  })

  describe('TeamIstance Instance', function(){
    it('should make requests on show with teamID', function(done) {
      testTeamInstance.fetch({team_id:1}, function(err, ti){
        assert(!err)
        assert(!!ti)
        assert.equal(ti.metadata.url, '/subseasons/1/teams/1')
        done()
      })
    })
  })

})