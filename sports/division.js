
module.exports = init

var Url = require('url')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

/**
 * The entry point for the Division api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  _.extend(config, conf)
  return Division
}

/**
 * Division Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Division = Model.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/divisions')
  },

  initialize: function(attr, options) {

  }

})
