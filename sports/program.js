var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * Program Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Program = module.exports = SportsModel.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/programs')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
