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
      options = _.extend({division_id: this.id}, options)
      return ngin.Standings.create(options).fetch(options, callback)
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
