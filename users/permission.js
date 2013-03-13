var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.Model
  var config = ngin.config

  /**
   * Permission Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Permission = Model.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.users || config.url
      return Url.resolve(base, '/permissions')
    }

  })

  return Permission

}
