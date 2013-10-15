"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * TeamCenterTeam Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TeamCenterTeam = SportsModel.extend({

    fetch: function(options, callback) {
      var url = TeamCenterTeam.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = TeamCenterTeam.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = TeamCenterTeam.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    members: function(callback) {
      return ngin.TeamCenterMember.list({ teamcenter_team_id: this.id }, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.teamCenterTeam || config.url
      return Url.resolve(base, '/teams')
    },

    list: function(options, callback) {
      var url = TeamCenterTeam.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return TeamCenterTeam

}
