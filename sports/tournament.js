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
      return Url.resolve(config.urls.sports, '/tournaments')
    },

    teams: function(options, callback) {
      var url = Url.resolve(config.urls.sports, '/tournaments/'+options.id+'/teams')
      return ngin.Team.list({url: url}, callback)
    },

    addTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamID
      Tournament.sync('update', null, { url:url }, callback)
    },

    removeTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamID
      Tournament.sync('delete', null, { url:url }, callback)
    }

  })

  return Tournament

}
