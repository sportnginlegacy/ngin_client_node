"use strict"
var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Tournament Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Tournament = SportsModel.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/tournaments')
    },

    teams: function(options, callback) {
      var url = this.urlRoot() + '/' + this.id + '/teams'
      return ngin.Team.list({url: url}, callback)
    },

    addTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamID
      Tournament.sync('update', null, { url:url }, callback)
    },

    removeTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamID
      Tournament.sync('delete', null, { url:url }, callback)
    },

    players: function(options, callback) {
      var url = this.urlRoot() + '/' + this.id + '/players'
      return ngin.Player.list({url:url}, callback)
    },

    addPlayer: function(playerID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_player/' + playerID
      Tournament.sync('update', null, { url:url }, callback)
    },

    removePlayer: function(playerID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_player/' + playerID
      Tournament.sync('delete', null, { url:url }, callback)
    },

    flightDefaults: function(callback) {
      return ngin.FlightDefault.create({tournament_id: this.id}).fetch(callback)
    },

    standingsDefaults: function(callback) {
      return ngin.StandingsDefault.create({tournament_id: this.id}).fetch(callback)
    },

    tiebreakPreference: function(callback){
      return ngin.TiebreakPreference.create({tournament_id: this.id}).fetch(callback)
    }

  })

  return Tournament

}
