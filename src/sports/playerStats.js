"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  var PlayerStats = SportsModel.extend({

    fetch: function(options, callback) {
      var url = PlayerStats.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = PlayerStats.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = PlayerStats.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/game_player_stats')
    },

    list: function(options, callback) {
      var url = PlayerStats.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return PlayerStats

}
