
module.exports = init

var Url = require('url')
var request = require('request')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

function isThirdNorth(perm) {
  return perm && perm.role === 'third_north'
}

/**
 * The entry point for the User api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  _.extend(config, conf)
  return User
}

/**
 * User Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var User = Model.extend({

  urlRoot: function() {
    var base = config.urls && config.urls.users || config.url
    return Url.resolve(base, '/users')
  },

  initialize: function(attr, options) {
    this.isThirdNorth = _.memoize(this.isThirdNorth)
  },

  isThirdNorth: function() {
    return this.permissions && this.permissions.some(isThirdNorth)
  }

}, {
  authenticate: function(options, callback) {
    var url = Url.resolve(config.urls.users, '/oauth/token')
    var payload = {
      client_id: options.clientID || config.clientID,
      client_secret: options.clientSecret || config.clientSecret,
      redirect_uri: options.redirectURI || config.redirectURI || undefined
    }

    if (options.code) {
      payload.grant_type = 'authorization_code'
      payload.code = options.code
    }
    else if (options.refresh) {
      payload.grant_type = 'refresh_token'
      payload.refresh_token = options.refresh
    }
    else if (options.username && options.password) {
      payload.grant_type = 'password'
      payload.username = options.username
      payload.password = options.password
    }

    request.post({
      uri: url,
      form: payload
    },
    function(err, res, body) {
      if (err) return callback(err)
      var data
      try {
        data = JSON.parse(body)
      } catch (ex) {
        console.log('Response from /oauth/token not parsable JSON:', body)
        err = ex
      }
      callback(err, data)
    })
  },

  me: function(options, callback) {
    options || (options = {})
    if (typeof options == 'function') {
      callback = options
      options = {}
    }
    options.url = Url.resolve(config.urls.users, '/oauth/me')
    User.create({id:'me'}, options, callback)
  }
})
