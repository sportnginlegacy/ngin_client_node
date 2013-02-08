"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * StandingsPreference Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var StandingsPreference = SportsModel.extend({

    urlRoot: function(options) {
      options = options || {}
      var subseasonID = options.subseason_id || this.subseason_id
      delete options.subseason_id

      var scope = ''
      if (options.pool_id || this.pool_id) {
        var poolID = options.pool_id || this.pool_id
        this.pool_id = poolID
        scope = '/pool/' + poolID
        delete options.pool_id
      } else if (options.division_id || this.division_id) {
        var divisionID = options.division_id || this.division_id
        this.division_id = divisionID
        scope = '/division/' + divisionID
        delete options.division_id
      }

      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, 'subseasons/' + subseasonID + scope + '/standings_preference')
    },

    save: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }
      options.method = options.method || 'PUT'
      StandingsPreference.__super__.save.call(this, options, callback)
    }

  })

  // wrap the inheirited list function with arg checking
  StandingsPreference.list = _.wrap(StandingsPreference.list, function(list, options, callback) {
    return callback(new Error('Not implemented'))
  })


  return StandingsPreference

}
