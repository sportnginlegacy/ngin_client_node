
module.exports = init

var Url = require('url')
var request = require('request')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

/**
 * The entry point for the Tournament api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  _.extend(config, conf)
  return Tournament
}

/**
 * Tournament Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Tournament = Model.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/tournaments')
  },

  initialize: function(attr, options) {

  }

})
