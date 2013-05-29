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
      if (!options.tournament_id)
        return callback(new Error('tournament_id is required'))
      var url = this.urlRoot()
      var params = {}
      params.query = {
        tournament_id: options.tournament_id,
      }

      if (options.game_slot_id) params.query.game_slot_id = options.game_slot_id

      return SportsModel.list.call(this, url, params, callback)
    }

  })

  return SchedulingConflict
}
