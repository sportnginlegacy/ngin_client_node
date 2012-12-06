var Model = require('../modelbase')
var _ = require('underscore')

var config = {}
var headers = {}

/**
 * Extend from this model to interact with stat ngin
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var SportsModel = module.exports = Model.extend({

  sync: function(method, options, callback) {
    options || (options = {})
    options.headers = _.extend({}, options.headers, headers)
    SportsModel.__super__.sync.call(this, method, options, callback)
  }

}, {

  /**
   * The entry point for the SportsModel base
   *
   * @param {Object} conf
   * @returns {Object}
   * @api public
   */

  init: function(conf) {
    _.extend(config, conf)
    headers['STAT-NGIN-API-TOKEN'] = config.statNginApiToken
    headers.Accept = 'application/vnd.stat-ngin.v2,application/json'
  },

  sync: function(method, model, options, callback) {
    options || (options = {})
    options.headers = _.extend({}, options.headers, headers)
    console.log('SPORTS MODEL HEADERS', options.headers)
    Model.sync(method, model, options, callback)
  }

})
