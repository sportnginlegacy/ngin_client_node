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
    if (!options || !options.division_id || !options.game_type)
      throw new Error('division_id and game_type required to make standings preference api calls')
    
    return ngin.Division.urlRoot() + '/' + options.division_id + StandingsPreference.urlRoot() + '/' + options.game_type
  }

  /**
   * StandingsPreference Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var StandingsPreference = SportsModel.extend({

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
    },

    destroy: function(options, callback) {
      options = _.extend(_.clone(options || {}), inst)
      if (!options.pool_id && !options.division_id)
        throw new Error('pool_id or division_id required to make standings preference destory calls')
      var url = scopeUrl(options)
      return Super.destory(this, url, options, callback)
    }

  }, {

    urlRoot: function() {
      return '/standings_preferences'
    }

  })

  return StandingsPreference

}
