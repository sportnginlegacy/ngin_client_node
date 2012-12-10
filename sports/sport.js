var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Sport Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Sport = SportsModel.extend({

    urlRoot: function() {
      return Url.resolve(config.urls.sports, '/sports')
    }

  })

  return Sport

}
