
module.exports = init

var Url = require('url')
var _ = require('underscore')
var Model = require('../modelbase')

var config = {}

/**
 * The entry point for the Member api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  config = conf
  return Member
}

/**
 * Member Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Member = Model.extend({

  urlRoot: function() {
    var base = config.urls && config.urls.members || config.url
    return Url.resolve(base, '/members')
  },

  initialize: function(attr, options) {

  }

})
