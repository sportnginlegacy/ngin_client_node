"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Standings Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Standings = SportsModel.extend({

    urlRoot: function(options) {
      options = options || {}
      var id, route = []

      if (id = options.subseason_id || this.subseason_id) route.push('subseasons', id)
      if (id = options.flight_stage_id || this.flight_stage_id) route.push('flight_stages', id)
      else if (id = options.division_id || this.division_id) route.push('divisions', id)
      else if (id = options.pool_id || this.pool_id) route.push('pools', id)
      else if (id = options.team_id || this.team_id) route.push('teams', id)
      route.push('standings')

      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, route.join('/'))
    }

  })

  // wrap the inheirited list function with arg checking
  Standings.list = _.wrap(Standings.list, function(list, options, callback) {
    return callback(new Error('Not implemented'))
  })

  return Standings

}
