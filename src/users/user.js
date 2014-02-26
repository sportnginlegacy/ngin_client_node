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
      this.isThirdNorth.toJSON = function() { return this() }
    },

    fetch: function(options, callback) {
      var url = User.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    parse: function(attr) {
      var attr = Super.parse.call(this, attr)
      return _.extend({}, attr.user)
    },

    isThirdNorth: function() {
      return this.role_assignments && this.role_assignments.some(isThirdNorth)
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

      var model = new Model(payload)
      return model.save(url, callback)
    },

    me: function(options, callback) {
      options || (options = {})
      if (typeof options == 'function') {
        callback = options, options = {}
      }
      var base = config.urls && config.urls.users || config.url
      options.url = Url.resolve(base, '/oauth/me')
      return User.create({id:'me'}, options, callback)
    }
  })

  return User

}
