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
      var base = config.urls && config.urls.sports || config.url
      if (this.team_id && this.subseason_id)
        return Url.resolve(base, 'subseasons/' + this.subseason_id + '/teams/' + this.team_id)
      if (this.subseason_id)
        return Url.resolve(base, 'subseasons/' + this.subseason_id + '/teams')
      if (this.team_id)
        return Url.resolve(base, 'teams/' + this.team_id + '/team_instances')
    }

  })

  // wrap the inheirited list function with arg checking
  TeamInstance.list = _.wrap(TeamInstance.list, function(list, options, callback) {
    if (!options.subseason_id && !options.team_id) return callback(new Error('subseason_id or team_id is required'))
    list.call(TeamInstance, options, callback)
  })

  return TeamInstance

}
