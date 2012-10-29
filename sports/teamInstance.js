
module.exports = init

var Url = require('url')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

/**
 * The entry point for the TeamInstance api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  config = conf
  return TeamInstance
}

/**
 * TeamInstance Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var TeamInstance = Model.extend({

  urlRoot: function() {
    var base = config.urls && config.urls.sports || config.url
    return Url.resolve(base, '/teamInstances')
  },

  initialize: function(attr, options) {

  }

})
