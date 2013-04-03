"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Season Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Season = SportsModel.extend({

    fetch: function(options, callback) {
      var url = Season.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = Season.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = Season.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    }

  },{

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/seasons')
    },

    list: function(options, callback) {
      options || (options = {})
      if ((!options.tournament_id && !options.league_id))
        return callback(new Error('tournament_id or league_id required'))
      options.query || (options.query = {})
      if (options.tournament_id) options.query.tournament_id = options.tournament_id
      if (options.league_id) options.query.league_id = options.league_id
      var url = Season.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Season

}
