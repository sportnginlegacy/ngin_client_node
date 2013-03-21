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
    var teamID = options.team_id
    var seasonID = options.season_id
    var base = config.urls && config.urls.sports || config.url
    base = Url.resolve(base, '/seasons/' + seasonID + '/teams/' + teamID + '/rosters')
    if (!options.id) return base
    return Url.resolve(base, encodeURIComponent(options.id))
  }

  /**
   * Roster Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Roster = SportsModel.extend({

    fetch: function(options, callback) {
      var url = Roster.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/rosters')
    },

    list: function(options, callback) {
      if (!options.url && !(options.season_id && options.team_id))
        return callback(new Error('season_id and team_id are required'))
      var url = scopeUrl(options)
      SportsModel.list.call(this, url, options, callback)
    }

  })

  return Roster

}
