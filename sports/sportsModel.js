"use strict"
var _ = require('underscore')

module.exports = function(ngin) {
  var config = ngin.config
  var Model = ngin.Model
  var headers = {
    'STAT-NGIN-API-TOKEN': config.statNginApiToken,
    'Accept': 'application/vnd.stat-ngin.v2,application/json'
  }

  /**
   * Extend from this model to interact with stat ngin
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var SportsModel = Model.extend({

    sync: function(method, options, callback) {
      options || (options = {})
      options.headers = _.extend({}, options.headers, headers)
      SportsModel.__super__.sync.call(this, method, options, callback)
    }

  }, {

    sync: function(method, model, options, callback) {
      options || (options = {})
      options.headers = _.extend({}, options.headers, headers)
      Model.sync(method, model, options, callback)
    }

  })

  return SportsModel

}
