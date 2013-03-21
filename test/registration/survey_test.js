"use strict"
var assert = require('assert')
var sinon = require('sinon')

var Server = require('../fixtures/http.js')
var NginClient = require('../../index')
var ngin = new NginClient({
  url:'http://localhost:1337'
})

var server
var testSurvey

describe('Survey Model', function() {

  before(function() {
    server = Server()
  })

  after(function(done) {
    server.close(done)
  })

  describe('Survey Class', function() {

    it("should make a request on create with ID", function(done) {
      ngin.Survey.create({id:1}, function(err, survey) {
        assert(!err)
        assert(!!survey)
        assert.equal(survey.metadata && survey.metadata.url, '/api2/registration/survey/show/1.json')
        done()
      })
    })

    it("should not throw on create without ID", function(done) {
      assert.doesNotThrow(function(){
        ngin.Survey.create({key:'val'})
      })
      done()
    })

    it("should throw on list", function(done) {
      assert.throws(function() {
        ngin.Survey.list({}, done)
      }, Error)
      done()
    })

  })

  describe('Survey Instance', function() {

    it('should throw on save', function(done) {
      var survey = new ngin.Survey({id:1}, {})
      assert.throws(function(){
        survey.save(done)
      }, Error)
      done()
    })

    it('should throw on delete', function(done) {
      var survey = new ngin.Survey({id:1}, {})
      assert.throws(function(){
        survey.delete(done)
      }, Error)
      done()
    })

  })

})
