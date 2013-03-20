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
    options = _.extend(_.clone(options || {}), inst)
    if (typeof options !== 'object' && (!options.tournament_id || !options.flight_id))
      throw new Error('tournament_id or flight_id required to make tibreak preference api calls')

    var url = ''
    if (options.tournament_id) {
      url += ngin.Tournament.urlRoot() + '/' + options.tournament_id
    } else if (options.flight_id) {
      url += ngin.Flight.urlRoot() + '/' + options.flight_id
    }
    return url + TiebreakPreference.urlRoot()
  }

  /**
   * TiebreakPreference Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TiebreakPreference = SportsModel.extend({

    // Fetch is used by Tournament and
    // list is being used by Flight. Can those
    // be consolidated?
    fetch: function(options, callback) {
      var url = scopeUrl(options, this)
      Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = scopeUrl(options, this)
      options.method = options.method || 'PUT'
      Super.save.call(this, url, options, callback)
    }

  }, {

    urlRoot: function() {
      // No need for the base portion of the url here
      // since this url must be scoped to another object.
      return '/tiebreak_preference'
    },

    list: function(options, callback) {
      var url = scopeUrl(options)
      SportsModel.list.call(this, url, options, callback)
    }

  })


  return TiebreakPreference

}
