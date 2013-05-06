"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * Scopes the url to the tournament or flight
   *
   * @param {Object} options
   * @returns {String}
   * @api public
   */

  function scopeUrl(options, inst) {
    options = _.extend(_.clone(options || {}), inst)
    if (!options.venue_id)
      throw new Error('venue_id required to make subvenue api calls')
    return ngin.Venue.urlRoot() + '/' + options.venue_id + '/subvenues'
  }

  /**
   * Subvenue Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Subvenue = Model.extend({

    fetch: function(options, callback) {
      var url = scopeUrl(options, this) + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = scopeUrl(options, this) + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = scopeUrl(options, this) + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    addReservation: function(options, callback) {
      var url = Subvenue.urlRoot() + '/' + this.id + '/reservations'
      return Super.save.call(this, url, options, callback)
    },

    removeReservation: function(options, callback) {
      var url = Subvenue.urlRoot() + '/' + this.id + '/reservations'
      return Super.destroy.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      var base = config.urls && config.urls.venues || config.url
      return Url.resolve(base, '/subvenues')
    },

    list: function(options, callback) {
      var url = Subvenue.urlRoot()
      return Model.list.call(Subvenue, url, options, callback)
    }

  })

  return Subvenue

}
