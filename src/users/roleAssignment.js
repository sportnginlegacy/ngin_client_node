var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * Permission Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var RoleAssignment = Model.extend({

  },{

    urlRoot: function() {
      var base = config.urls && config.urls.users || config.url
      return Url.resolve(base, '/role_assignments')
    },

    list: function(options, callback) {
      if (!options.url)
        return callback(new Error('No url provided for Role Assignment list'))
      return Model.list.call(this, null, options, callback)
    }

  })

  return RoleAssignment

}
