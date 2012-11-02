
module.exports = init

var Url = require('url')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

/**
 * The entry point for the Program api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  _.extend(config, conf)
  return Program
}

/**
 * Program Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Program = Model.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/programs')
  },

  initialize: function(attr, options) {

  }

})
