
module.exports = init

var Url = require('url')
var request = require('request')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

/**
 * The entry point for the Player api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  _.extend(config, conf)
  return Player
}

/**
 * Player Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Player = Model.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/players')
  },

  initialize: function(attr, options) {

  }

})
