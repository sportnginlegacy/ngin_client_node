var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.Model
  var config = ngin.config

  /**
   * Persona Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Persona = Model.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.users || config.url
      return Url.resolve(base, '/personas')
    },

    permissions: function(callback) {
      var url = this.urlRoot() + '/' + this.id + '/permissions'
      return ngin.Permission.list(_.extend({}, null, {url:url}), callback)
    },

    groups: function(options, callback) {
      if (typeof options === 'function') {
        callback = options
        options = {}
      }
      options || (options = {})
      var url = this.urlRoot() + '/' + this.id + '/groups'
      return ngin.Permission.list(_.extend({}, options, {url:url}), callback)
    },

  })

  return Persona

}
