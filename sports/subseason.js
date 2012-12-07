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
      return Url.resolve(config.urls.sports, '/subseasons')
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
    }

  })

  return Subseason

}
