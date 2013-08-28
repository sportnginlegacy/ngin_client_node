"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Flight Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Flight = SportsModel.extend({

    fetch: function(options, callback) {
      var url = Flight.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = Flight.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = Flight.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    addTeam: function(teamID, callback) {
      var url = Flight.urlRoot() + '/' + this.id + '/add_team/' + teamID
      return Flight.sync('update', null, { url:url }, this.callbackWithParse(callback))
    },

    removeTeam: function(teamID, callback) {
      var url = Flight.urlRoot() + '/' + this.id + '/remove_team/' + teamID
      return Flight.sync('delete', null, { url:url }, callback)
    },

    addToWaitlist: function(teamID, callback) {
      var url = Flight.urlRoot() + '/' + this.id + '/add_to_waitlist/' + teamID
      return Flight.sync('update', null, { url:url }, this.callbackWithParse(callback))
    },

    removeFromWaitlist: function(teamID, callback) {
      var url = Flight.urlRoot() + '/' + this.id + '/remove_from_waitlist/' + teamID
      return Flight.sync('update', null, { url:url }, this.callbackWithParse(callback))
    },

    stages: function(callback){
      return ngin.FlightStage.list({flight_id: this.id}, callback)
    },

    createSchedule: function(callback) {
      var url = Flight.tournamentUrlRoot() + '?flight_id=' + this.id
      return Flight.sync('create', null, { url:url }, this.callbackWithParse(callback))
    },

    schedule: function(callback) {
      return ngin.GameSlot.list({flight_id: this.id}, callback)
    },

    gameLimits: function(callback){
      return ngin.GameLimits.create({flight_id: this.id}).fetch(callback)
    },

    // Commenting this out for now. It may be needed later, however,
    // it probably shouldn't be using `list`.
    // tiebreakPreference: function(callback){
    //   return ngin.TiebreakPreference.list({flight_id: this.id}, function(err, list, resp) {
    //     if (Array.isArray(list) && !err ) {
    //       return callback(err, list[0], resp)
    //     }
    //     callback(err, null, resp)
    //   })
    // }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/flights')
    },

    tournamentUrlRoot: function(options) {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/tournament_schedules')
    },

    list: function(options, callback) {
      if (!options.tournament_id)
        return callback(new Error('tournament_id is required to list flights'))
      options.query || (options.query = {})
      options.query.tournament_id = options.tournament_id
      var url = Flight.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Flight

}
