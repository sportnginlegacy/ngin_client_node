"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Player Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Player = SportsModel.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/players')
    }

  })

  return Player

}
