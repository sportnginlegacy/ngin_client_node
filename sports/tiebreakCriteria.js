"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * TiebreakCriteria Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TiebreakCriteria = SportsModel.extend({
    // no instance methods
  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/tiebreak_criteria')
    },

    list: function(options, callback) {
      if (!options.sport_id)
        return callback(new Error('sport_id is required to list tibreak criteria'))
      options.query = { sport_id:options.sport_id }
      var url = TiebreakCriteria.urlRoot()
      SportsModel.list.call(this, url, options, callback)
    }

  })


  return TiebreakCriteria

}
