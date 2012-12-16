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
      ngin.Standings.list({subseason_id: this.id}, function(err, list, opts) {
        if (Array.isArray(list) && !err) {
          return callback(err, list[0], opts)
        }
        callback(err, null, opts)
      })
    },

    standingsPreference: function(callback) {
      ngin.StandingsPreference.list({subseason_id: this.id}, function(err, list, opts) {
        if (Array.isArray(list) && !err) {
          return callback(err, list[0], opts)
        }
        callback(err, null, opts)
      })
    }

  })

  return Subseason

}
