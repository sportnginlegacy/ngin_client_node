"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * Venue Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Venue = Model.extend({

    fetch: function(options, callback) {
      var url = Venue.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = Venue.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = Venue.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    availableTimes: function(callback) {
      return ngin.AvailableTimes.create({venue_id:this.id}).fetch(callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.venues || config.url
      return Url.resolve(base, '/venues')
    },

    list: function(options, callback) {
      var url = Venue.urlRoot()
      return Model.list.call(this, url, options, callback)
    }

  })

  return Venue

}
