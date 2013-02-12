"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.Model
  var config = ngin.config

  /**
   * Message Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Message = Model.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.messages || config.url
      return Url.resolve(base, '/messages')
    }

  })

  return Message

}
