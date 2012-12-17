var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * StandingsPreference Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TiebreakPreference = SportsModel.extend({

    urlRoot: function(options) {
      options = options || {}
      var scope = ''
      if (options.tournament_id || this.tournament_id) {
        var tournamentID = options.tournament_id || this.tournament_id
        this.tournament_id = tournamentID
        scope = 'tournaments/' + tournamentID
        delete options.tournament_id
      } else if ((options.flight_id || this.flight_id) && (options.flight_stage_id || this.flight_stage_id)) {
        var flightID = options.flight_id || this.flight_id
        var flightStageID = options.flight_stage_id || this.flight_stage_id
        this.flight_id = flightID
        this.flight_stage_id = flightStageID
        scope = 'flights/' + flightID + '/flight_stages/' + flightStageID
        delete options.flight_id
        delete options.flight_stage_id
      }

      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, scope + '/tiebreak_preference')
    },

    save: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }

      options.type = options.method || 'PUT'
      TiebreakPreference.__super__.save.call(this, options, callback)
    }

  },{
    parseList: function(data, resp) {
      if (data.result) data = data.result
      return [data]
    }
  })


  return TiebreakPreference

}