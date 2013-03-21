"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Sport Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Sport = SportsModel.extend({

    standingsModules: function(callback) {
      return ngin.StandingsModule.create({sport_id: this.id}).fetch(callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/sports')
    },

    list: function(options, callback) {
      var url = Sport.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Sport

}
