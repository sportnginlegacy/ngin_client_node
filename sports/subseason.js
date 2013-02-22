"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Subseason Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Subseason = SportsModel.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/subseasons')
    },

    addTeam: function(teamId, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamId
      Subseason.sync('update', null, { url:url }, callback)
    },

    removeTeam: function(teamId, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamId
      Subseason.sync('delete', null, { url:url }, callback)
    },

    addDivision: function(divisionId, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_division/' + divisionId
      Subseason.sync('update', null, { url:url }, callback)
    },

    removeDivision: function(divisionId, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_division/' + divisionId
      Subseason.sync('delete', null, { url:url }, callback)
    },

    standings: function(callback) {
      return ngin.Standings.create({subseason_id: this.id}).fetch(callback)
    },

    standingsPreference: function(callback) {
      return ngin.StandingsPreference.create({subseason_id: this.id}).fetch(callback)
    },

    teams: function(callback) {
      var url = this.urlRoot() + '/' + this.id + '/teams'
      return ngin.TeamInstance.list({url:url}, callback)
    }

  })

  return Subseason

}
