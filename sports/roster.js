var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * Roster Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Roster = module.exports = SportsModel.extend({

  url: function(options){
    // TODO: throw an error if no season_id or team_id
    var base = config.urls && config.urls.sports || config.url
    base = Url.resolve(base, '/subseasons/' + options.subseason_id + '/teams/' + options.team_id + '/rosters' )
    if (!this.id) return base
    return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id)
  },

  urlRoot: function() {
    var base = config.urls && config.urls.sports || config.url
    return Url.resolve(base, '/rosters')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
