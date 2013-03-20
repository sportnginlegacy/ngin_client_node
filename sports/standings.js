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

  function buildUrl(options, inst) {
    // if (!options || typeof options !== 'object' || !options.tournament_id || !options.flight_id)
    //   throw new Error('tournament_id or flight_id required to make tibreak preference api calls')

    options || (options = {})
    inst || (inst = {})
    var id, route = []

    if (id = options.subseason_id || inst.subseason_id) route.push('subseasons', id)
    if (id = options.flight_stage_id || inst.flight_stage_id) route.push('flight_stages', id)
    else if (id = options.division_id || inst.division_id) route.push('divisions', id)
    else if (id = options.pool_id || inst.pool_id) route.push('pools', id)
    else if (id = options.team_id || inst.team_id) route.push('teams', id)
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
      var url = buildUrl(options, this)
      return Super.fetch.call(this, url, options, callback)
    }

  })

  return Standings

}
