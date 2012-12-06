var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * FlightStage Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var FlightStage = module.exports = SportsModel.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/flight_stages')
  },

  validate: function() {
    return ~['pool', 'bracket'].indexOf(this.type) ? false : 'Property "type" has an invalid value'
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
