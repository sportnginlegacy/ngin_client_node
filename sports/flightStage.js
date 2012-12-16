var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * FlightStage Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var FlightStage = SportsModel.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'flights/' + this.flight_id + '/flight_stages')
    },

    validate: function() {
      return ~['pool', 'bracket'].indexOf(this.type) ? false : 'Property "type" has an invalid value'
    },

    addTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamID
      FlightStage.sync('update', null, { url:url }, callback)
    },

    removeTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamID
      FlightStage.sync('delete', null, { url:url }, callback)
    }

  })

  return FlightStage

}