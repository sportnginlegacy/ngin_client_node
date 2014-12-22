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

    fetch: function(options, callback) {
      var url = TeamStats.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = TeamStats.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = TeamStats.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    aggregateFromPlayers: function(options, callback) {
      var url = TeamStats.urlRoot() + '/aggregate_from_players'
      return TeamStats.sync('create', options, { url: url }, this.callbackWithParse(callback))
    },

    setGameResult: function(options, callback) {
      var url = TeamStats.urlRoot() + '/' + this.id + '/set_game_result'
      return TeamStats.sync('create', options, { url: url }, this.callbackWithParse(callback))
    }

  }, {

    urlRoot: function(options) {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/game_team_stats')
    },

    list: function(options, callback) {
      var url = TeamStats.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return TeamStats

}
