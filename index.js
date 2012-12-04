
module.exports = ApiClient

var _ = require('underscore')


var models = [
  'sports/Bracket',
  'sports/Division',
  'sports/Flight',
  'sports/FlightStage',
  'sports/Game',
  'sports/League',
  'sports/Player',
  'sports/Pool',
  'sports/Program',
  'sports/Season',
  'sports/Sport',
  'sports/Subseason',
  'sports/Team',
  'sports/TeamInstance',
  'sports/Tournament',
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

ApiClient.prototype.setAuth = function(auth) {
  this.conf.auth = auth
  setupHeaders(this.conf)
}

function setupHeaders(conf) {
  conf.headers = _.defaults({}, conf.headers, {
    'STAT-NGIN-API-TOKEN': conf.statNginApiToken,
    'Accept': 'application/vnd.stat-ngin.v2,application/json'
  })
  if (conf.auth && conf.auth.access_token) {
    conf.headers.Authorization = 'Bearer ' + conf.auth.access_token
  }
}
