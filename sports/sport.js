var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * Sport Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Sport = SportsModel.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/sports')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
    client = conf.client
  }

})
