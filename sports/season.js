var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * Season Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Season = module.exports = SportsModel.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/seasons')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
