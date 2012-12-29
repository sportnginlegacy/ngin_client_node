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

    /**
    * create: flight_id
    * publish: flight_id
    * update: game_slot_id
    */

    urlRoot: function(options) {
      options = options || {}
      var objectID = null
      if (options.flight_id || this.flight_id) {
        objectID = options.flight_id || this.flight_id
        this.object_id = flightID
        delete options.flight_id
      } else if (options.game_slot_id || this.game_slot_id) {
        objectID = options.game_slot_id || this.game_slot_id
        this.object_id = objectID
        delete options.game_slot_id
      }
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'tournament_schedules/' + objectID)
    },

    publish:function(options, callback) {
      var url = this.urlRoot() + '/publish'
      TournamentSchedule.sync('create', null, { url:url }, callback)
    }
  })

  return TournamentSchedule

}
