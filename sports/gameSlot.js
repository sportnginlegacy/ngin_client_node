"use strict"
var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

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
      var url = GameSlot.urlRoot() + '/' + this.id
      return Super.save.call(this, url, options, callback)
    },

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'tournament_schedules')
    },

    list: function(options, callback) {
      if (!options.flight_id && !options.flight_stage_id)
        return callback(new Error('flight_id or flight_stage_id is required'))
      options.query || (options.query = {})
      if (options.flight_id) options.query.flight_id = options.flight_id
      if (options.flight_stage_id) options.query.flight_stage_id = options.flight_stage_id
      var url = GameSlot.urlRoot()
      SportsModel.list.call(this, url, options, callback)
    }

  })

  return GameSlot

}
