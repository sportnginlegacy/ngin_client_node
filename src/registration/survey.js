"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * Survey Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Survey = Model.extend({

    fetch: function(options, callback) {
      var id = this.id || options.id
      var url = Survey.urlRoot() + '/show' + (id ? '/'+id : '') + '.json'
      return Super.fetch.call(this, url, options, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.ngin || config.url
      return Url.resolve(base, '/api2/registration/survey')
    }

  })

  return Survey

}
