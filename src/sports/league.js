"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * League Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var League = SportsModel.extend({

    fetch: function(options, callback) {
      var url = League.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = League.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = League.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    }, 

    seasons: function(options, callback) {
      return ngin.Season.list({league_id: this.id}, callback)
    }

  },{

    standingsDefaults: function(options, callback) {
      return ngin.StandingsDefault.list(options, callback)
    },

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/leagues')
    },

    list: function(options, callback) {
      var url = League.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return League

}
