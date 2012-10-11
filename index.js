
module.exports = ApiClient

var _ = require('underscore')


var models = [
  'sports/Team',
  'sports/League',
  'users/Member',
  'users/User',
  'messages/Message'
]

/**
 * Common entry point for all API models
 *
 * @param {Object} conf
 * @api public
 */

function ApiClient(conf) {
  var self = this
  this.conf = conf

  // add the config to sync
  var sync = require('./sync')
  sync.config = conf

  // setup header defaults
  setupHeaders(conf)

  // add each model to the ApiClient
  models.forEach(function(modelPath) {
    modelName = modelPath.substring(modelPath.indexOf('/')+1)
    self[modelName] = require('./'+modelPath.toLowerCase())(conf)
  })

}

function setupHeaders(conf) {
  conf.headers = _.defaults({}, conf.headers, {
    'NGIN-API-VERSION': conf.version || 0.1,
    //'STAT-NGIN-API-TOKEN': conf.apiToken,
    'Accept': 'application/json'
  })
}
