"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.Model
  var config = ngin.config || {}

  /**
   * Organization Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Organization = Model.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.boss || config.url
      return Url.resolve(base, '/organizations')
    }

  },{

    mine: function(callback) {
      var base = config.urls && config.urls.boss || config.url
      var url = Url.resolve(base, '/organizations/mine')
      Organization.list({url:url}, callback)
    }

  })

  return Organization

}
