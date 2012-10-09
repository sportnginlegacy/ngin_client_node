
module.exports = ApiClient

var _ = require('underscore')


var models = [
  'sports/Team',
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
    'API-NGIN-VERSION': conf.version
  })
}
