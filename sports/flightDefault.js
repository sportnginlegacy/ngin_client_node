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
    if (typeof options !== 'object' && !options.tournament_id)
      throw new Error('tournament_id required to make flight defaults api calls')

    return ngin.Tournament.urlRoot() + '/' + options.tournament_id + FlightDefault.urlRoot()
  }

  /**
   * FlightDefault Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var FlightDefault = SportsModel.extend({

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
      return FlightDefault.__super__.save.call(this, options, callback)
    }

  }, {

    urlRoot: function() {
      return '/flight_defaults'
    }

  })

  return FlightDefault

}
