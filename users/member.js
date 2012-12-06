var Url = require('url')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

/**
 * Member Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Member = module.exports = Model.extend({

  urlRoot: function() {
    var base = config.urls && config.urls.members || config.url
    return Url.resolve(base, '/members')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
