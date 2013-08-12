var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * Scopes the url to a user, group, or persona
   *
   * @param {Object} options
   * @returns {String}
   * @api private
   */

  function scopeUrl(options, inst) {
    options = _.extend(options || {}, inst)
    var query = options.query || {}

    if (!options.url && !query.user_id && !query.group_id && !(query.owner_type && query.owner_id)) {
      return callback(new Error('user_id or group_id or (owner_type and owner_id) are required'))
    }

    if (query.user_id) {
      ;delete options.query // deleting query because we don't need it on requests for user and group personas
      return ngin.User.urlRoot() + '/' + query.user_id + '/personas'
    }

    if (query.group_id) {
      ;delete options.query // deleting query because we don't need it on requests for user and group personas
      return ngin.Group.urlRoot() + '/' + query.group_id + '/personas'
    }

    if (query.owner_type && query.owner_id) {
      return Persona.urlRoot()
    }

  }

  /**
   * Persona Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Persona = Model.extend({

    fetch: function(options, callback) {
      var url = Persona.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = Persona.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = Persona.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    permissions: function(options, callback) {
      if (typeof options === 'function') {
        callback = options, options = {}
      }
      options || (options = {})
      var url = Persona.urlRoot() + '/' + this.id + '/permissions'
      return ngin.Permission.list(_.extend({}, options, {url:url}), callback)
    },

    groups: function(options, callback) {
      if (typeof options === 'function') {
        callback = options, options = {}
      }
      options || (options = {})
      var url = Persona.urlRoot() + '/' + this.id + '/groups'
      return ngin.Permission.list(_.extend({}, options, {url:url}), callback)
    },

    removeFromOrg: function(orgID, callback) {
      if (orgID == null || typeof orgID == 'function')
        return callback(new Error('orgID is required'))
      if (!this.id)
        return callback(new Error('persona has no ID'))
      var url = Persona.urlRoot() + '/' + this.id + '/Organization/' + orgID
      return Super.destroy.call(this, url, {}, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.users || config.url
      return Url.resolve(base, '/personas')
    },

    list: function(options, callback) {
      var url = scopeUrl(options)
      return Model.list.call(this, url, options, callback)
    }

  })

  return Persona

}
