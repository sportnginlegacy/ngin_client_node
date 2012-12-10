var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * League Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var League = SportsModel.extend({

    urlRoot: function() {
      return Url.resolve(config.urls.sports, '/leagues')
    }

  })

  return League

}
