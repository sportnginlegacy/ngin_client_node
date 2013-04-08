"use strict"
var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Tournament Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Tournament = SportsModel.extend({

    fetch: function(options, callback) {
      var url = Tournament.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = Tournament.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = Tournament.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    teams: function(options, callback) {
      if (typeof options == 'function') {
        callback = options, options = {}
      }
      options.url = Tournament.urlRoot() + '/' + this.id + '/teams'
      return ngin.Team.list(options, callback)
    },

    addTeam: function(teamID, callback) {
      var url = Tournament.urlRoot() + '/' + this.id + '/add_team/' + teamID
      return Tournament.sync('update', null, { url:url }, this.callbackWithParse(callback))
    },

    removeTeam: function(teamID, callback) {
      var url = Tournament.urlRoot() + '/' + this.id + '/remove_team/' + teamID
      return Tournament.sync('delete', null, { url:url }, callback)
    },

    players: function(options, callback) {
      if (typeof options == 'function') {
        callback = options, options = {}
      }
      options.url = Tournament.urlRoot() + '/' + this.id + '/players'
      return ngin.Player.list(options, callback)
    },

    addPlayer: function(playerID, callback) {
      var url = Tournament.urlRoot() + '/' + this.id + '/add_player/' + playerID
      return Tournament.sync('update', null, { url:url }, this.callbackWithParse(callback))
    },

    removePlayer: function(playerID, callback) {
      var url = Tournament.urlRoot() + '/' + this.id + '/remove_player/' + playerID
      return Tournament.sync('delete', null, { url:url }, this.callbackWithParse(callback))
    },

    flightDefaults: function(callback) {
      return ngin.FlightDefault.create({tournament_id: this.id}).fetch(callback)
    },

    standingsDefaults: function(callback) {
      return ngin.StandingsDefault.create({tournament_id: this.id}).fetch(callback)
    },

    tiebreakPreference: function(callback){
      // url: /tournaments/:id/tiebreak_preference
      var url = Tournament.urlRoot() + '/' + this.id + ngin.TiebreakPreference.urlRoot()
      return ngin.TiebreakPreference.create({}).fetch({url:url}, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/tournaments')
    },

    list: function(options, callback) {
      var url = Tournament.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Tournament

}
