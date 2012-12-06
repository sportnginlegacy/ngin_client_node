var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * Game Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Game = module.exports = SportsModel.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/games')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
