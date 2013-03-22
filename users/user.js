"use strict"
var Url = require('url')
var request = require('request')
var _ = require('underscore')

function isThirdNorth(perm) {
  return perm && perm.role === 'third_north'
}

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * User Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var User = Model.extend({

    initialize: function(attr, options) {
      this.isThirdNorth = _.memoize(this.isThirdNorth)
    },

    parse: function(attr) {
      var attr = Super.parse.call(this, attr)
      return _.extend({}, attr.user, { permissions: attr.permissions })
    },

    isThirdNorth: function() {
      return this.permissions && this.permissions.some(isThirdNorth)
    },

    personas: function(callback) {
      var url = User.urlRoot() + '/' + this.id + '/personas'
      return ngin.Persona.list(_.extend({}, {url:url}), callback)
    },

    groups: function(options, callback) {
      if (typeof options === 'function') {
        callback = options, options = {}
      }
      options || (options = {})
      var url = User.urlRoot() + '/' + this.id + '/groups'
      return ngin.Persona.list(_.extend({}, options, {url:url}), callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.users || config.url
      return Url.resolve(base, '/users')
    },

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

      // var opts = { url:url }
      Model.sync.call(this, 'create', payload, { url:url }, function(err, data, res) {
        if (!err && typeof data !== 'object')
          err = new Error('Response from /oauth/token not parsable JSON')
        callback(err, data, res)
      })
    },

    me: function(options, callback) {
      options || (options = {})
      if (typeof options == 'function') {
        callback = options, options = {}
      }
      options.url = Url.resolve(config.urls.users, '/oauth/me')
      User.create({id:'me'}, options, callback)
    }
  })

  return User

}
