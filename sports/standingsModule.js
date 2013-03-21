"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * StandingsModule Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var StandingsModule = SportsModel.extend({

    fetch: function(options, callback) {
      var url = ngin.Sport.urlRoot() + '/' + this.sport_id + StandingsModule.urlRoot()
      return Super.fetch.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      return '/standings_modules'
    }

  })

  return StandingsModule

}
