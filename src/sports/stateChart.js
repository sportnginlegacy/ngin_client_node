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
      var url = StateChart.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    }

  }, {

    urlRoot: function() {
      return this.resolve('/state_charts')
    }

  })

  return StateChart
}
