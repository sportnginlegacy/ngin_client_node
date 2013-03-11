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
    }

  },{

    orgs: function(orgID, callback) {
      var base = config.urls && config.urls.users || config.url
      var url = Url.resolve(base, '/personas?owner_type=organization&owner_id=' + orgID)
      Persona.list({url:url}, callback)
    }

  })

  return Persona

}
