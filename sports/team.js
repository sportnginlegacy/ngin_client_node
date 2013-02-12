"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Team Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Team = SportsModel.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/teams')
    },

    standings: function(subseason_id, callback) {
      ngin.Standings.create({subseason_id: subseason_id, team_id: this.id}).fetch(callback)
    },

    roster: function(subseason_id, callback) {
      ngin.Roster.create({team_id: this.id, subseason_id: subseason_id}).fetch(callback)
    },

    instances: function(callback) {
      var url = this.urlRoot() + '/' + this.id + '/team_instances'
      ngin.TeamInstance.list({url:url}, callback)
    }

  })

  return Team

}
