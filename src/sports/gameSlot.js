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
   * GameSlot Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var GameSlot = SportsModel.extend({

    save: function(options, callback) {
      var url = GameSlot.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    getConflicts: function(options, callback) {
      if (!options.tournament_id)
        return callback(new Error('tournament_id is required'))
      var url = GameSlot.conflictsUrlRoot()
      return ngin.SchedulingConflict.list({tournament_id: options.tournament_id, game_slot_id: this.id}, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'tournament_schedules')
    },

    conflictsUrlRoot: function() {
      var base = config.urls && config.urls.sports || config.urls
      return Url.resolve(base, '/scheduling_conflicts')
    },

    list: function(options, callback) {
      if (!options.flight_id && !options.flight_stage_id)
        return callback(new Error('flight_id or flight_stage_id is required'))
      options.query || (options.query = {})
      if (options.flight_id) options.query.flight_id = options.flight_id
      if (options.flight_stage_id) options.query.flight_stage_id = options.flight_stage_id
      var url = GameSlot.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    },

    update: function(options, callback) {
      var url = GameSlot.urlRoot()
      if (!options.tournament_id)
        return callback(new Error('tournament_id is required'))
      options.query || (options.query = {})
      if (options.tournament_id) options.query.tournament_id = options.tournament_id
      return massUpdate.call(this, url, options, callback)
    }

  })

  return GameSlot

}
