var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * Division Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Division = module.exports = SportsModel.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/divisions')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
