"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Team Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Team = SportsModel.extend({

    fetch: function(options, callback) {
      var url = Team.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = Team.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = Team.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    roster: function(season_id, callback) {
      return ngin.Roster.list({team_id: this.id, season_id: season_id}, callback)
    },

    instances: function(callback) {
      return ngin.TeamInstance.list({team_id:this.id}, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/teams')
    },

    list: function(options, callback) {
      var url = Team.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Team

}
