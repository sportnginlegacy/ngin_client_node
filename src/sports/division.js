"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Scopes the url to the season
   *
   * @param {Object} options
   * @returns {String}
   * @api public
   */

  function scopeUrl(options, inst) {
    options = _.extend({}, inst, options)
    if (!options.season_id)
      throw new Error('season_id required to make division instance api calls')

    return ngin.Season.urlRoot() + '/' + options.season_id + Division.urlRoot()
  }

  /**
   * Division Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Division = SportsModel.extend({

    fetch: function(options, callback) {
      var url = scopeUrl(options, this) + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = scopeUrl(options, this) + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = scopeUrl(options, this) + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    standings: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }

      options = _.extend({division_id: this.id}, options)
      return ngin.Standings.create(options).fetch(options, callback)
    },

    teams: function(options, callback) {
      if (typeof options == 'function') {
        callback = options, options = {}
      }
      options.query = options.query || {}
      options.query.division_id = this.id
      return ngin.TeamInstance.list(options, callback)
    },

    addTeam: function(teamID, callback) {
      var url = ngin.Season.urlRoot() + '/' + this.season_id + Division.urlRoot() + '/' + this.id + '/add_team/' + teamID
      return Division.sync('update', null, { url:url }, this.callbackWithParse(callback))
    },

    removeTeam: function(teamID, callback) {
      var url = ngin.Season.urlRoot() + '/' + this.season_id + Division.urlRoot() + '/' + this.id + '/remove_team/' + teamID
      return Division.sync('delete', null, { url:url }, callback)
    }


  }, {

    urlRoot: function(seasonID) {
      return '/divisions'
    },

    list: function(options, callback) {
      var url = scopeUrl(options, this)
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Division

}
