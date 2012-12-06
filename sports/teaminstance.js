var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * TeamInstance Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var TeamInstance = module.exports = SportsModel.extend({

  url: function(options){
    // TODO: throw an error if no season_id?
    var base = config.urls && config.urls.sports || config.url
    base = Url.resolve(base, '/subseasons/' + options.subseason_id + '/teams' )
    if (!this.id) return base
    return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id)
  },

  urlRoot: function() {
    var base = config.urls && config.urls.sports || config.url
    return Url.resolve(base, '/subseasons')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
