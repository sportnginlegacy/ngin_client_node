"use strict"

var glob = require('glob')
var _ = require('underscore')

// setup global underscore template settings
_.templateSettings = {
  escape : /\{\{(.+?)\}\}/g
}

var models = {}
var searchPaths = [
  'sports/*.js',
  'users/*.js',
  'messages/*.js',
  'boss/*.js',
  'venues/*.js',
  'registration/*.js',
  'officials/*.js',
  'teamcenter/*.js'
]

function hasher(ngin) {
  return ngin && ngin.auth && (ngin.auth.access_token || ngin.auth.auth_key || '')
}

// Find all the individual models
searchPaths.forEach(function(path) {
  var files = glob.sync(path, {cwd:__dirname})
  files.forEach(function(modelPath) {
    var modelName = modelPath.substring(modelPath.indexOf('/')+1).replace('.js','')
    modelName = modelName.charAt(0).toUpperCase() + modelName.substring(1)
    var Model = require('./'+modelPath)
    models[modelName] = _.memoize(Model, hasher)
  })
})

/**
 * Common entry point for all API models
 *
 * @param {Object} config
 * @api public
 */

function ApiClient(config) {
  var self = this
  this.config = _.extend({}, config, {client:this})
  config.headers = _.extend({}, config.headers, { Accept: 'application/json' })

  this.auth = config.auth

  models.sync = require('./sync')
  models.Model = require('./modelbase')
  models.NginModel = require('./nginModel')

  // add each model to the ApiClient
  Object.keys(models).forEach(function(modelName) {
    Object.defineProperty(self, modelName, {
      get: function() { return models[modelName](self) },
      enumerable:true,
      configurable:true
    })
  })
  _.extend(this, models)
}

_.extend(ApiClient.prototype, {

  setAuth: function(auth) {
    this.auth = auth
  }

})

module.exports = ApiClient
