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
      throw new Error('tournament_id required to make StandingsDefault api calls')

    return ngin.Tournament.urlRoot() + '/' + options.tournament_id + StandingsDefault.urlRoot()
  }

  /**
   * StandingsDefault Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var StandingsDefault = SportsModel.extend({

    fetch: function(options, callback) {
      var url = scopeUrl(options, this)
      Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }
      var url = scopeUrl(options, this)
      options.method = options.method || 'PUT'
      Super.save.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      return '/standings_defaults'
    }

  })

  return StandingsDefault

}
