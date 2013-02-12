"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Sport Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Sport = SportsModel.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/sports')
    },

    standingsModules: function(callback) {
      ngin.StandingsModule.create({sport_id: this.id}).fetch(callback)
    },

  })

  return Sport

}
