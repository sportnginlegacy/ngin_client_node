"use strict"
var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * GameSlot Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var GameSlot = SportsModel.extend({

    urlRoot: function(options) {
      options = options || {}
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'tournament_schedules')
    }

  })

  // wrap the inheirited list function with arg checking
  GameSlot.list = _.wrap(GameSlot.list, function(list, options, callback) {
    if (!options.flight_id && !options.flight_stage_id) return callback(new Error('flight_id is required'))
    list.call(GameSlot, options, callback)
  })

  return GameSlot

}
