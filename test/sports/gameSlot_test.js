"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server

describe('GameSlot Model', function() {

  beforeEach(function(done) {
    server = Server()
    done()
  })

  afterEach(function(done) {
    server.close(done)
  })

  it('should make requests on list', function(done) {
    ngin.GameSlot.list(function(err, data, resp) {
      assert(!err)
      assert(!!resp)
      data = JSON.parse(resp.body)
      assert.equal(data.metadata.url, '/tournament_schedules')
      done()
    })
  })

  it('should make requests on save with ID', function(done) {
    var gameslot = ngin.GameSlot.create({id:1}, {fetched:true})
    gameslot.save(function(err, data, resp) {
      assert(!err)
      assert(!!resp)
      data = JSON.parse(resp.body)
      assert.equal(data.metadata.url, '/tournament_schedules/1')
      done()
    })
  })

})
