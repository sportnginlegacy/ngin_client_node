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
      var base = config.urls && config.urls.members || config.url
      return Url.resolve(base, '/personas')
    }

  })

  return Persona

}
