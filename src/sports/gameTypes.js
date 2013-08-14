"use strict"
var Url = require('url')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * GameTypes Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var GameTypes = SportsModel.extend({

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/game_types')
    },

    list: function(options, callback) {
      var url = GameTypes.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return GameTypes

}
