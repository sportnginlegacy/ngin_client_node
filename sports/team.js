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
      var url = Team.urlRoot() + '/' + this.id
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = Team.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    standings: function(subseason_id, callback) {
      return ngin.Standings.create({subseason_id: subseason_id, team_id: this.id}).fetch(callback)
    },

    roster: function(season_id, callback) {
      return ngin.Roster.create({team_id: this.id, season_id: season_id}).fetch(callback)
    },

    instances: function(callback) {
      var url = Team.urlRoot() + '/' + this.id + '/team_instances'
      return ngin.TeamInstance.list({url:url}, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/teams')
    },

    list: function(options, callback) {
      var url = Bracket.urlRoot()
      SportsModel.list.call(this, url, options, callback)
    }

  })

  return Team

}
