var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * FlightDefault Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var FlightDefault = SportsModel.extend({

    urlRoot: function(options) {
      options = options || {}
      var tournamentID = options.tournament_id || this.tournament_id
      var base = config.urls && config.urls.sports || config.url
      console.log("+++++++++++++++++\n", tournamentID, base)
      return Url.resolve(base, 'tournaments/' + tournamentID + '/flight_stage_defaults')
    }

  },{
    list: function(options, callback) {
      // if (!options.flight_id) return callback('Error: flight_id is required')
      SportsModel.list(options, callback)
    },

    parseList: function(data, resp) {
      // if (!options.flight_id) return callback('Error: flight_id is required')
      SportsModel.parseList(data, resp)
    }
  })

  return FlightDefault

}
