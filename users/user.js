
module.exports = init

var Url = require('url')
var request = require('request')
var _ = require('underscore')

var config = {}
var urlFragment = '/oauth/authorize'

/**
 * The entry point for the User api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  config = conf
  return User
}

/**
 * User Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

function User(attr, options) {

}


User.prototype = {

  _url: function() {
    var url = Url.resolve(config.urlBase, urlFragment)
    if (this.id) url = Url.resolve(url, this.id)
    return url
  }

}



User.authenticate = function(options, callback) {
  var url = Url.resolve(config.urlBase, '/oauth/token')
  request.post({
    uri: url,
    form: {
      client_id: options.clientID,
      client_secret: options.clientSecret,
      grant_type: 'password',
      username: options.username,
      password: options.password
    }
  },
  function(err, res, body) {
    if (err) return callback(err)
    callback(err, JSON.parse(body))
  })
}
