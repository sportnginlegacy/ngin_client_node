"use strict"
var assert = require('assert')
var sinon = require('sinon')

var http = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient(require('../fixtures/config.js'))

var server

describe('SeasonImportTemplate Model', function() {

  before(function(done) {
    server = http(done)
  })

  after(function(done) {
    server.close(done)
  })

  describe('SeasonImportTemplate Class', function() {
    // No methods (besides urlRoot())
  })

  describe('SeasonImportTemplate Instance', function() {

    var seasonImportTemplate

    beforeEach(function() {
      seasonImportTemplate = ngin.SeasonImportTemplate.create({ season_id: 1, type: 'team', csv_string: 'asdf' }, { fetched: true })
    })

    it('should fail to make requests on save without season_id', function(done) {
      seasonImportTemplate.season_id = null
      seasonImportTemplate.save(function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

    it('should fail to make requests on save without type', function(done) {
      seasonImportTemplate.type = null
      seasonImportTemplate.save(function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

    it('should fail to make requests on save without csv_string', function(done) {
      seasonImportTemplate.csv_string = null
      seasonImportTemplate.save(function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

    it('should fail to make requests on save with ID', function(done) {
      seasonImportTemplate.id = 1
      seasonImportTemplate.save(function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

    it('should make requests on save without ID', function(done) {
      seasonImportTemplate.save(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(resp.req.method, 'POST')
        assert.equal(resp.req.path, '/seasons/1/import_jobs')
        done()
      })
    })

  })

})
