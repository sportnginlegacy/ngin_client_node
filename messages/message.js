var Url = require('url')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

/**
 * Message Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Message = module.exports = Model.extend({

  urlRoot: function() {
    var base = config.urls && config.urls.messages || config.url
    return Url.resolve(base, '/messages')
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
