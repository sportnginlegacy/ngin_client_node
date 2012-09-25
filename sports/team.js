
module.exports = init

var Url = require('url')
var request = require('request')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

/**
 * The entry point for the Team api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  config = conf
  return Team
}

/**
 * Team Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Team = Model.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/teams')
  },

  initialize: function(attr, options) {

  }

})
