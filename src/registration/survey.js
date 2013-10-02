"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * Scopes the url to the tournament or flight
   *
   * @param {Object} options
   * @returns {String}
   * @api public
   */

  function scopeUrl(options, inst, action) {
    var opts = _.extend({}, inst, options)
    if (!opts.id && !opts.tournament_id && !opts.league_id && !opts.season_id)
      throw new Error('id, season_id, tournament_id or league_id required to make survey api calls')
    return Survey.urlRoot() + '/' + action + (opts.id ? '/' + opts.id : '') + '.json'
  }

  /**
   * Survey Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Survey = Model.extend({

    fetch: function(options, callback) {
      options || (options = {})
      if (typeof options == 'function') callback = options, options = {}

      var url = scopeUrl(options, this, 'show')
      options.query = _.extend(_.pick(options, 'season_id', 'tournament_id', 'league_id'), options.query)
      return Super.fetch.call(this, url, options, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.ngin || config.url
      return Url.resolve(base, '/api2/registration/survey')
    }

  })

  return Survey

}
