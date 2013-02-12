"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * StandingsDefault Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var StandingsDefault = SportsModel.extend({

    urlRoot: function(options) {
      options = options || {}
      var tournamentID = options.tournament_id || this.tournament_id
      this.tournament_id = tournamentID
      delete options.tournament_id
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'tournaments/' + tournamentID + '/standings_defaults')
    },

    save: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }

      options.method = options.method || 'PUT'
      StandingsDefault.__super__.save.call(this, options, callback)
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

  // wrap the inheirited list function with arg checking
  StandingsDefault.list = _.wrap(StandingsDefault.list, function(list, options, callback) {
    return callback(new Error('Not implemented'))
  })


  return StandingsDefault

}
