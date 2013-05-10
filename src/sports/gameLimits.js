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
    if (typeof options !== 'object' && (!options.tournament_id || !options.flight_id))
      throw new Error('tournament_id required to make GameLimits api calls')

    if(options.tournament_id){
      return ngin.Tournament.urlRoot() + '/' + options.tournament_id + GameLimits.urlRoot()
    }else{
      return ngin.Flight.urlRoot() + '/' + options.flight_id + GameLimits.urlRoot()
    }
  }

  /**
   * GameLimits Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var GameLimits = SportsModel.extend({

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
      return '/game_limits'
    }

  })

  return GameLimits

}
