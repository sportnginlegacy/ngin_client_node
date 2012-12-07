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
      return Url.resolve(config.urls.sports, '/flights')
    },

    addTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamID
      Flight.sync('update', null, { url:url }, callback)
    },

    removeTeam: function(teamID, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamID
      Flight.sync('delete', null, { url:url }, callback)
    }

  })

  return Flight

}
