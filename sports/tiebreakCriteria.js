"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * StandingsPreference Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TiebreakCriteria = SportsModel.extend({

    urlRoot: function(options) {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/tiebreak_criteria')
    }

  })


  return TiebreakCriteria

}