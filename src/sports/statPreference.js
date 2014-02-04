"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config


  function scopeUrl(options, inst) {
    options = _.extend(_.clone(options || {}), inst)
    if (typeof options !== 'object' && !options.season_id)
      throw new Error('season_id required to make stat preferences api calls')

    if (typeof options !== 'object' && !options.game_type)
      throw new Error('game_type required to make stat preferences api calls')

    return ngin.Season.urlRoot() + '/' + options.season_id + StatPreference.urlRoot() + '/' + options.game_type
  }

  /**
   * StatPreference Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var StatPreference = SportsModel.extend({
    
    fetch: function(options, callback) {
      var url = scopeUrl(options, this)
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      if (typeof options == 'function') callback = options, options = {}
      var url = scopeUrl(options, this)
      options.method = options.method || 'PUT'
      return Super.save.call(this, url, options, callback)
    }

  }, 

  {
    urlRoot: function(options) {
      return '/stat_preferences'
    },

  })

  return StatPreference

}
