var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

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

    permissions: function(callback) {
      var url = Persona.urlRoot() + '/' + this.id + '/permissions'
      return ngin.Permission.list(_.extend({}, null, {url:url}), callback)
    },

    groups: function(options, callback) {
      if (typeof options === 'function') {
        callback = options, options = {}
      }
      options || (options = {})
      var url = Persona.urlRoot() + '/' + this.id + '/groups'
      return ngin.Permission.list(_.extend({}, options, {url:url}), callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.users || config.url
      return Url.resolve(base, '/personas')
    },

    list: function(options, callback) {
      var query = options.query || {}
      if (!options.url && !query.user_id && !query.group_id && !(query.owner_type && query.owner_id)) {
        return callback(new Error('user_id or group_id or (owner_type and owner_id) are required'))
      }
      var url = Persona.urlRoot()
      return Model.list.call(this, url, options, callback)
    }

  })

  return Persona

}
