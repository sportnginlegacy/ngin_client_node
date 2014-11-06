"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * TeamStats Class
   *
   * @param {Array} game_id        Games to query for data
   * @param {Array} game_type      Game types to query for data
   * @param {Array} team_id        Teams to query for data
   * @param {Array} season_id      Seasons to query for data
   * @param {Array} stat_module_id Stat modules to query for data
   * @api public
   */

  // TODO: document params for other methods/paths from https://github.com/sportngin/stat_ngin/blob/v2-stats-controllers/app/controllers/v2/team_stats_controller.rb

  var TeamStats = SportsModel.extend({

  }, {

    urlRoot: function(options) {
      return '/team_stats'
    }

    // TODO: add list/show/save methods?

  })

  return TeamStats

}
