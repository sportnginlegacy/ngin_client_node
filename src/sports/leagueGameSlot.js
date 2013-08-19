"use strict"
var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')
var massUpdate = require('../mixins/massUpdate')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * LeagueGameSlot Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var LeagueGameSlot = SportsModel.extend({

    fetch: function(options, callback) {
      var url = LeagueGameSlot.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = LeagueGameSlot.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    getConflicts: function(options, callback) {
      if (!options.league_id)
        return callback(new Error('league_id is required'))
      return ngin.SchedulingConflict.list({league_id: options.league_id, game_slot_id: this.id}, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'league_schedules')
    },

    list: function(options, callback) {
      if (!options.season_id && !options.game_slot_id)
        return callback(new Error('season_id or game_slot_id is required'))
      options.query || (options.query = {})
      if (options.season_id) options.query.season_id = options.season_id
      if (options.game_slot_id) options.query.game_slot_id = options.game_slot_id
      var url = options.url || LeagueGameSlot.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    },

    export: function(options, callback) {
      options.url = LeagueGameSlot.urlRoot() + '.csv'
      options.headers = {'Accept': 'application/vnd.stat-ngin.v2,text/csv'}
      return LeagueGameSlot.list(options, callback)
    },

    update: function(options, callback) {
      var url = LeagueGameSlot.urlRoot()
      if (!options.league_id)
        return callback(new Error('league_id is required'))
      options.query || (options.query = {})
      if (options.league_id) options.query.league_id = options.league_id
      return massUpdate.call(this, url, options, callback)
    },

    generate: function(options, callback) {
      if (!options.season_id || !options.game_type)
        return callback(new Error('season_id and game_type are required'))

      var url = ngin.Season.urlRoot() + '/' + options.season_id + '/divisions/matchups/' + options.game_type
      var params = _.extend({}, { url: url })

      if (!params.url) throw new Error('Url not present')

      return this.sync('create', options, params, function(err, data, resp) {
        if (err) return callback(err, data, resp)

        data = this.parseList(data)
        callback(err, data, resp)
      }.bind(this))
    }

  })

  return LeagueGameSlot

}
