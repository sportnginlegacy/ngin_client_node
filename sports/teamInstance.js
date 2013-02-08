var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * TeamInstance Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TeamInstance = SportsModel.extend({

    urlRoot: function(options) {
      var options = options || {}
      var base = config.urls && config.urls.sports || config.url
      var team_id = options.team_id || this.team_id
      var subseason_id = options.subseason_id || this.subseason_id
      if (team_id && subseason_id)
        return Url.resolve(base, 'subseasons/' + subseason_id + '/teams/' + team_id)
      if (subseason_id)
        return Url.resolve(base, 'subseasons/' + subseason_id + '/teams')
      if (team_id)
        return Url.resolve(base, 'teams/' + team_id + '/team_instances')
    }

  })

  // wrap the inheirited list function with arg checking
  TeamInstance.list = _.wrap(TeamInstance.list, function(list, options, callback) {
    if (!options.url && !options.subseason_id && !options.team_id)
      return callback(new Error('subseason_id or team_id are required'))
    list.call(TeamInstance, options, callback)
  })

  return TeamInstance

}
