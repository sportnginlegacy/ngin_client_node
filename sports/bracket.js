var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * Bracket Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Bracket = module.exports = SportsModel.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/brackets')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
