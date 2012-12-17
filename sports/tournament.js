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

    flightDefaults: function(callback) {
      return ngin.FlightDefault.list({tournament_id: this.id}, function(err, list, opts) {
        if (Array.isArray(list) && !err) {
          return callback(err, list[0], opts)
        }
        callback(err, null, opts)
      })
    },

    tiebreakPreference: function(callback){
      return ngin.TiebreakPreference.list({tournament_id: this.id}, function(err, list, opts) {
        if (Array.isArray(list) && !err ) {
          return callback(err, list[0], opts)
        }
        callback(err, null, opts)
      })
    }

  })

  return Tournament

}
