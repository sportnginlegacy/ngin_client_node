"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * PlatformTeam Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var PlatformTeam = SportsModel.extend({

    fetch: function(options, callback) {
      var url = PlatformTeam.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = PlatformTeam.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = PlatformTeam.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.platformTeam || config.url
      return Url.resolve(base, '/teams')
    },

    list: function(options, callback) {
      var url = PlatformTeam.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return PlatformTeam

}
