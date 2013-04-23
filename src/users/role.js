var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * Roles Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Role = Model.extend({

  },{

    urlRoot: function() {
      var base = config.urls && config.urls.users || config.url
      return Url.resolve(base, '/roles')
    },

    list: function(options, callback) {
      var url = Role.urlRoot()
      return Model.list.call(this, url, options, callback)
    }

  })

  return Role

}
