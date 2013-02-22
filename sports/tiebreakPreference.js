"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * TiebreakPreference Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TiebreakPreference = SportsModel.extend({

    urlRoot: function(options) {
      options = options || {}
      var scope = ''
      if (options.tournament_id || this.tournament_id) {
        var tournamentID = options.tournament_id || this.tournament_id
        this.tournament_id = tournamentID
        scope = 'tournaments/' + tournamentID
        delete options.tournament_id
      } else if (options.flight_id || this.flight_id) {
        var flightID = options.flight_id || this.flight_id
        this.flight_id = flightID
        scope = 'flights/' + flightID
        delete options.flight_id
      }

      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, scope + '/tiebreak_preference')
    },

    save: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }

      options.method = options.method || 'PUT'
      TiebreakPreference.__super__.save.call(this, options, callback)
    },

    url: function(options){
      // Get base url
      var url = (this.urlRoot instanceof Function) ? this.urlRoot(options) : this.urlRoot
      // Add options as query parameters
      var separator = "?"
      _.each(options, function(val, key){
        url += separator + encodeURIComponent(key) + "=" + encodeURIComponent(val)
        separator = "&"
      })
      return url
    }

  })


  return TiebreakPreference

}
