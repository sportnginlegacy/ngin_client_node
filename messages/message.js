
module.exports = init

var Url = require('url')
var request = require('request')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

/**
 * The entry point for the Message api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  config = conf
  return Message
}

/**
 * Message Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Message = Model.extend({

  urlRoot: function() {
    var base = config.urls && config.urls.messages || config.url
    return Url.resolve(base, '/messages')
  },

  initialize: function(attr, options) {

  }

})
