"use strict"
var _ = require('underscore')
var assert = require('assert')
var sinon = require('sinon')

var Server = require('./fixtures/http.js')
var NginClient = require('./../index')
var ngin = new NginClient(require('./fixtures/config.js'))

var server

describe('List Pagination', function() {

  before(function() {
    sinon.spy(ngin.Bracket, 'list')
  })

  after(function() {
    ngin.Bracket.list.restore()
  })

  describe('Single Page Response', function() {

    before(function() {
      ngin.Bracket.list.reset()
      server = Server({
        metadata: { pagination: { total_pages: 1, current_page: 1 } },
        data: _.range(5)
      })
    })

    it('should make requests on list', function(done) {
      ngin.Bracket.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(data.length, 5)
        assert(ngin.Bracket.list.calledOnce)
        done()
      })
    })

    after(function(done) {
      server.close(done)
    })

  })

  describe('Single Page Request', function() {

    before(function() {
      ngin.Bracket.list.reset()
      server = Server({
        metadata: { pagination: { total_pages: 10, current_page: 4 } },
        data: _.range(5)
      })
    })

    it('should make requests on list', function(done) {
      ngin.Bracket.list({page:4}, function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(data.length, 5)
        assert(ngin.Bracket.list.calledOnce)
        done()
      })
    })

    after(function(done) {
      server.close(done)
    })

  })

  describe('Auto-Pagination', function() {

    before(function() {
      ngin.Bracket.list.reset()
      server = Server({
        metadata: { pagination: { total_pages: 3, current_page: 1 } },
        data: _.range(5)
      })
    })

    it('should make requests on list', function(done) {
      ngin.Bracket.list(function(err, data, resp) {
        assert(!err)
        assert(!!resp)
        assert.equal(data.length, 15)
        assert(ngin.Bracket.list.calledThrice)
        done()
      })
    })

    after(function(done) {
      server.close(done)
    })

  })

})
