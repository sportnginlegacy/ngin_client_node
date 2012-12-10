var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Season Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Season = SportsModel.extend({

    urlRoot: function() {
      return Url.resolve(config.urls.sports, '/seasons')
    }

  })

  return Season

}
