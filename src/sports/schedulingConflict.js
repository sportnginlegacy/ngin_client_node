"use strict"
var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super =  SportsModel.prototype
  var config = ngin.config

  /**
  * SchedulingConflict Class
  *
  * @param {Object} attr
  * @param {Object} options
  * @api public
  */

  var SchedulingConflict = SportsModel.extend({

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/scheduling_conflicts')
    },

    list: function(options, callback) {
      if (!(options.tournament_id || options.league_id))
        return callback(new Error('tournament_id or league_id is required'))
      var url = this.urlRoot()
      var query_params
      if (options.tournament_id) {
        query_params = {tournament_id: options.tournament_id}
      } else {
        query_params = {league_id: options.league_id}
      }
      var params = {
        query: query_params
      }

      if (options.game_slot_id) params.query.game_slot_id = options.game_slot_id

      return SportsModel.list.call(this, url, params, callback)
    }

  })

  return SchedulingConflict
}
