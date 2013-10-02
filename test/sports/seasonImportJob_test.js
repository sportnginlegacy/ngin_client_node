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

    it('should make requests on list with season_id', function(done) {
      ngin.SeasonImportJob.list({ season_id: 1 }, function(err, data, resp) {
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

  })

  describe('SeasonImportJob Instance', function() {

    var seasonImportJob

    beforeEach(function() {
      seasonImportJob = ngin.SeasonImportJob.create({ season_id: 1, type: 'team', csv_string: 'asdf' }, { fetched: true })
    })

    it('should fail to make requests on save without season_id', function(done) {
      seasonImportJob.season_id = null
      seasonImportJob.save(function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

    it('should fail to make requests on save without type', function(done) {
      seasonImportJob.type = null
      seasonImportJob.save(function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

    it('should fail to make requests on save without csv_string', function(done) {
      seasonImportJob.csv_string = null
      seasonImportJob.save(function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

    it('should fail to make requests on save with ID', function(done) {
      seasonImportJob.id = 1
      seasonImportJob.save(function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      seasonImportJob.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/seasons/1/import_jobs')
        done()
      })
    })

  })

})
