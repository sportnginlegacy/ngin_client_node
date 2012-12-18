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
      options = options || {}
      var subseasonID = options.subseason_id || this.subseason_id
      this.subseason_id = subseasonID
      delete options.subseason_id
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'subseasons/' + subseasonID + '/teams')
    }

  })

  // wrap the inheirited list function with arg checking
  TeamInstance.list = _.wrap(TeamInstance.list, function(list, options, callback) {
    if (!options.subseason_id) return callback(new Error('subseason_id is required'))
    list.call(TeamInstance, options, callback)
  })

  return TeamInstance

}
