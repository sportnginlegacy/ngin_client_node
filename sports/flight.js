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
      return ngin.Flightstage.list({flight_id: this.id}, callback)
    }

  })

  return Flight

}
