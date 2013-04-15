"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * Reservation Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Reservation = Model.extend({}, {

    urlRoot: function() {
      var base = config.urls && config.urls.venues || config.url
      return Url.resolve(base, '/reservations')
    },

    list: function(options, callback) {
      var url = Reservation.urlRoot()
      return Model.list.call(this, url, options, callback)
    }

  })

  return Reservation

}
