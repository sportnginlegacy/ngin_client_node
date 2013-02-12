"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * StandingsModule Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var StandingsModule = SportsModel.extend({

    urlRoot: function(options) {
      options = options || {}
      var sportID = options.sport_id || this.sport_id
      this.sport_id = sportID
      delete options.sport_id
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'sports/' + sportID + '/standings_modules')
    },

    save: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }
      options.method = options.method || 'PUT'
      StandingsPreference.__super__.save.call(this, options, callback)
    }
  })

  return StandingsModule

}
