"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Player Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Player = SportsModel.extend({

    fetch: function(options, callback) {
      var url = ngin.Player.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = ngin.Player.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = ngin.Player.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    }

  },{

    urlRoot: function(opts) {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/players')
    },

    list: function(options, callback) {
      var url = ngin.Player.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Player

}
