"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * StatModule Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var StatModule = SportsModel.extend({

    fetch: function(options, callback) {
      var url = StatModule.urlRoot()
      return Super.fetch.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/stat_modules')
    }

  })

  return StatModule

}
