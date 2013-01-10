var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Team Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Team = SportsModel.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/teams')
    },

    standings: function(subseason_id) {
      ngin.Standings.list({subseason_id: subseason_id, team_id: this.id}, function(err, list, opts) {
        if (Array.isArray(list) && !err) {
          return callback(err, list[0], opts)
        }
        callback(err, null, opts)
      })
    }

  })

  return Team

}
