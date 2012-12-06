var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * League Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var League = module.exports = SportsModel.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/leagues')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
