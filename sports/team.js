var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * Team Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Team = module.exports = SportsModel.extend({

  urlRoot: function() {
    var base = config.urls && config.urls.sports || config.url
    return Url.resolve(base, '/teams')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
