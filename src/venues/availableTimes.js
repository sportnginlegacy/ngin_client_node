"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * Scopes the url to the venue
   *
   * @param {Object} options
   * @returns {String}
   * @api public
   */

  function scopeUrl(options, inst) {
    options = _.extend(_.clone(options || {}), inst)
    if (!options.venue_id)
      throw new Error('venue_id required to make subvenue api calls')
    return ngin.Venue.urlRoot() + '/' + options.venue_id + AvailableTimes.urlRoot()
  }

  /**
   * AvailableTimes Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var AvailableTimes = Model.extend({

    fetch: function(options, callback) {
      var url = scopeUrl(options, this)
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }
      var url = scopeUrl(options, this)
      options.method = options.method || 'PUT'
      return Super.save.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      return '/available_times'
    }

  })

  return AvailableTimes

}
