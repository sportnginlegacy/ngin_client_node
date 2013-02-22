"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.Model
  var config = ngin.config

  /**
   * Venue Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Venue = Model.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.venues || config.url
      return Url.resolve(base, '/venues')
    },

    availableTimes: function(callback) {
      var url = this.urlRoot() + '/' + this.id + '/available_times'
      Venue.sync('read', null, { url:url }, callback)
    },

    updateAvailableTimes: function(callback) {
      var url = this.urlRoot() + '/' + this.id + '/available_times'
      Venue.sync('update', null, { url:url }, callback)
    }

  })

  return Venue

}
