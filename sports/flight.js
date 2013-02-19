"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Flight Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Flight = SportsModel.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/flights')
    },

    tournamentUrlRoot: function(options) {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/tournament_schedules')
    },

    addTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamID
      Flight.sync('update', null, { url:url }, callback)
    },

    removeTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamID
      Flight.sync('delete', null, { url:url }, callback)
    },

    addToWaitlist: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_to_waitlist/' + teamID
      Flight.sync('update', null, { url:url }, callback)
    },

    removeFromWaitlist: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_from_waitlist/' + teamID
      Flight.sync('update', null, { url:url }, callback)
    },

    stages: function(callback){
      ngin.FlightStage.list({flight_id: this.id}, callback)
    },

    createSchedule: function(callback) {
      var url = this.tournamentUrlRoot() + '?flight_id=' + this.id
      Flight.sync('create', null, { url:url }, callback)
    },

    schedule: function(callback) {
      ngin.GameSlot.list({flight_id: this.id}, callback)
    },

    publish: function(callback) {
      var url = this.tournamentUrlRoot() + '/publish?flight_id=' + this.id
      // semantically this is an update (PUT), but must technically be a POST
      ngin.GameSlot.sync('update', null, { url:url, method:'POST' }, callback)
    },

    tiebreakPreference: function(callback){
      return ngin.TiebreakPreference.list({flight_id: this.id}, function(err, list, resp) {
        if (Array.isArray(list) && !err ) {
          return callback(err, list[0], resp)
        }
        callback(err, null, resp)
      })
    },

  })

  return Flight

}
