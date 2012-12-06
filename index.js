
module.exports = ApiClient

var _ = require('underscore')
var glob = require('glob')

var models = {}
var searchPaths = [
  'sports/*.js',
  'users/*.js',
  'messages/*.js'
]

// Find all the individual models
searchPaths.forEach(function(path) {
  var files = glob.sync(path, {cwd:__dirname})
  files.forEach(function(modelPath) {
    modelName = modelPath.substring(modelPath.indexOf('/')+1).replace('.js','')
    modelName = modelName.charAt(0).toUpperCase() + modelName.substring(1)
    var Model = require('./'+modelPath)
    models[modelName] = Model
  })
})

/**
 * Common entry point for all API models
 *
 * @param {Object} conf
 * @api public
 */

function ApiClient(conf) {
  this.conf = _.extend({}, conf, {client:this})
  conf.headers = _.extend({}, conf.headers, { Accept: 'application/json' })

  // add the config to sync
  var sync = this.sync = require('./sync')
  sync.config = conf

  // add each model to the ApiClient
  for (var modelName in models) {
    models[modelName].init(conf)
  }
  _.extend(this, models)
}
