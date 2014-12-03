"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config
  var _ = require('underscore')

  /**
   * GameDefaults Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  function formatQuery(options) {
    console.log("VALIDATE:", options)
    var requiredParams
    if (typeof options !== 'function') {
      options.query = requiredParams = _.pick(_.extend({}, options, options.query), 'tournament_id', 'league_id', 'flight_id', 'division_id')
    }
    if (_.isEmpty(requiredParams)) throw new Error('tournament_id, league_id, flight_id or division_id are required.')
  }

  var GameDefaults = SportsModel.extend({

    fetch: function(options, callback) {
      formatQuery(options)
      var url = GameDefaults.urlRoot()
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      formatQuery()
      options.method = options.method || 'PUT'
      var url = GameDefaults.urlRoot()
      return Super.save.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/game_defaults')
    }

  })

  return GameDefaults

}
