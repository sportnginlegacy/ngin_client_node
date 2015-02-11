"use strict"

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * StateChart Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var StateChart = SportsModel.extend({

    fetch: function(options, callback) {
      return Super.fetch.call(this, this.urlById(), options, callback)
    }

  }, {

    urlRoot: function() {
      return this.resolve('/state_charts')
    }

  })

  return StateChart
}
