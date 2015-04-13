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

    it('should build a proper base url', function() {
      var urlRoot = ngin.SeasonImportTemplate.urlRoot({ season_id: 1, type: 'player' })
      assert.equal('http://localhost:1337/seasons/1/import_templates/player.csv', urlRoot)
    })

  })

  describe('SeasonImportTemplate Instance', function() {

    var seasonImportTemplate

    beforeEach(function() {
      seasonImportTemplate = ngin.SeasonImportTemplate.create({ season_id: 1, type: 'player' }, { fetched: true })
    })

    it('should make requests with valid parameters', function(done) {
      seasonImportTemplate.fetch(function(err, data, resp) {
        assert(!err)
        done()
      })
    })

    it('should fail to make requests on fetch without season_id', function(done) {
      seasonImportTemplate.season_id = null
      seasonImportTemplate.fetch(function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

    it('should fail to make requests on fetch without type', function(done) {
      seasonImportTemplate.type = null
      seasonImportTemplate.fetch(function(err, data, resp) {
        assert(!!err)
        done()
      })
    })

  })

})
