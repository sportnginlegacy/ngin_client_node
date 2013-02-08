"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.Model
  var config = ngin.config

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
    }

  })

  return Member

}
