"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Scopes the url to the tournament or flight
   *
   * @param {Object} options
   * @returns {String}
   * @api public
   */

  function scopeUrl(options, inst) {
    options = _.extend(_.clone(options || {}), inst)
    if (typeof options !== 'object' && (!options.tournament_id || !options.flight_id || !options.league_id))
      throw new Error('tournament_id required to make StandingsDefault api calls')

    return options.tournament_id ? tournamentUrl(options.tournament_id) : leagueUrl(options.league_id, options.game_type)
  }

  function tournamentUrl(tournament_id) {
    return ngin.Tournament.urlRoot() + '/' + tournament_id + StandingsDefault.urlRoot()
  }

  function leagueUrl(league_id, game_type) {
    return ngin.League.urlRoot() + '/' + league_id + StandingsDefault.urlRoot() + '/' + game_type
  }

  /**
   * StandingsDefault Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var StandingsDefault = SportsModel.extend({

    fetch: function(options, callback) {
      var url = scopeUrl(options, this)
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }
      var url = scopeUrl(options, this)
      options.method = options.method || 'PUT'
      return Super.save.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      return '/standings_defaults'
    }

  })

  return StandingsDefault

}
