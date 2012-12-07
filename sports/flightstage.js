var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * FlightStage Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var FlightStage = SportsModel.extend({

    urlRoot: function() {
      return Url.resolve(config.urls.sports, '/flight_stages')
    },

    validate: function() {
      return ~['pool', 'bracket'].indexOf(this.type) ? false : 'Property "type" has an invalid value'
    }

  })

  return FlightStage

}
