"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config
  var Super = SportsModel.prototype

  /**
   * Scopes the url to the tournament or flight
   *
   * @param {Object} options
   * @returns {String}
   * @api public
   */

  function scopeUrl(options, inst) {
    options = _.extend({}, inst, options)
    
    if (!options.season_id && !options.team_id)
      throw new Error('season_id and/or team_id required to make team instance api calls')

    if (options.season_id) {
      var url = ngin.Season.urlRoot() + '/' + options.season_id + '/teams'
      return options.team_id ? url + '/' + options.team_id : url
    } else {
      return ngin.Team.urlRoot() + '/' + options.team_id + '/' + ngin.TeamInstance.urlRoot()
    }
  }

  /**
   * TeamInstance Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TeamInstance = SportsModel.extend({

    fetch: function(options, callback) {
      var url = scopeUrl(options, this)
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }
      if (options.team_id || this.team_id){
        options.method = 'PUT'
      }
      var url = scopeUrl(options, this)
      return Super.save.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      return '/team_instances'
    },

    list: function(options, callback) {
      var url = scopeUrl(options, this)
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return TeamInstance

}
