"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('SeasonImportJob Model', function() {

  before(function(done) {
    server = Server(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('SeasonImportJob Class', function() {

    it('should make requests on list with seasonID', function(done) {
      ngin.SeasonImportJob.list({ seasonID: 1 }, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'GET')
        assert.equal(resp.req.path, '/seasons/1/import_jobs')
        done()
      })
    })

    it('should fail to make requests on list with required args', function(done) {
      ngin.SeasonImportJob.list({}, function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

    it('should fail to make requests on save with ID', function(done) {
      ngin.SeasonImportJob.create({ id: 1, seasonID: 1 }, { fetched: true }).save(function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      ngin.SeasonImportJob.create({ seasonID: 1 }, { fetched: true }).save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/seasons/1/import_jobs')
        done()
      })
    })

  })

})
