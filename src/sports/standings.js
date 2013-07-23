"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Builds the url based on crazy
   *
   * @param {Object} options
   * @param {Object} inst
   * @returns {String}
   * @api public
   */

  function scopeUrl(options, inst) {
    options = _.extend(_.clone(options || {}), inst)
    var route = []

    if (options.flight_stage_id) route.push('flight_stages', options.flight_stage_id)
    else if (options.division_id) route.push('divisions', options.division_id)
    else if (options.pool_id) route.push('pools', options.pool_id)
    else if (options.team_id) route.push('teams', options.team_id)
    route.push('standings')

    var base = config.urls && config.urls.sports || config.url
    return Url.resolve(base, route.join('/'))
  }

  /**
   * Standings Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Standings = SportsModel.extend({

    fetch: function(options, callback) {
      var url = scopeUrl(options, this)
      return Super.fetch.call(this, url, options, callback)
    }

  })

  return Standings

}
