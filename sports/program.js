"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Program Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Program = SportsModel.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/programs')
    }

  })

  return Program

}
