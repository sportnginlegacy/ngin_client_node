var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * Player Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Player = module.exports = SportsModel.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/players')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
