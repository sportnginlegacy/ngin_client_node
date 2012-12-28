var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * TournamentSchedule Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TournamentSchedule = SportsModel.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/tournament_schedules')
    }
  })

  return TournamentSchedule

}
