"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * GameSheet Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */
  // - test fetch throws error
  // - everthing blows up

  var GameSheet = SportsModel.extend({},{})

  return GameSheet

}
