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

    urlRoot: function(options) {
      options = options || {}
      var flightID = options.flight_id || this.flight_id
      this.flight_id = flightID
      delete options.flight_id
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'flights/' + flightID + '/flight_stages')
    },

    validate: function() {
      return ~['pool','single_elim','double_elim','round_robin'].indexOf(this.type) ? false : 'Property "type" has an invalid value'
    },

    addTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamID
      FlightStage.sync('update', null, { url:url }, callback)
    },

    removeTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamID
      FlightStage.sync('delete', null, { url:url }, callback)
    },

    schedule: function(callback) {
      ngin.GameSlot.list({flight_stage_id: this.id}, callback)
    },

    standings: function(callback) {
      return ngin.Standings.create({ flight_stage_id:this.id }).fetch(callback)
    },

    teams_advancing: function(callback) {
      var url = this.urlRoot() + '/' + this.id + '/teams_advancing'
      FlightStage.sync('fetch', null, { url:url }, callback)
    },

    advance_teams: function(callback) {
      var url = this.urlRoot() + '/' + this.id + '/teams_advancing'
      FlightStage.sync('update', null, { url:url }, callback)
    }

  })

  // wrap the inheirited list function with arg checking
  FlightStage.list = _.wrap(FlightStage.list, function(list, options, callback) {
    if (!options.flight_id) return callback(new Error('flight_id is required'))
    list.call(FlightStage, options, callback)
  })

  return FlightStage

}