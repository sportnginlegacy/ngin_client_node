var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Pool Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Pool = SportsModel.extend({

    urlRoot: function() {
      return Url.resolve(config.urls.sports, '/pools')
    },

    addTeam: function(teamId, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamId
      Pool.sync('update', null, { url:url }, callback)
    },

    removeTeam: function(teamId, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamId
      Pool.sync('delete', null, { url:url }, callback)
    }

  })

  return Pool

}
