"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.NginModel
  var Super = Model.prototype
  var config = ngin.config

  /**
   * VenueGameAssignment Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var VenueGameAssignment = Model.extend({

    fetch: function(options, callback) {
      var url = VenueGameAssignment.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = VenueGameAssignment.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = VenueGameAssignment.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.officials || config.url
      return Url.resolve(base, '/game_assignments')
    },

    list: function(options, callback) {
      var url = VenueGameAssignment.urlRoot()
      return Model.list.call(this, url, options, callback)
    },

    mass_update: function(options, callback) {
      var url = VenueGameAssignment.urlRoot() + '/mass_update'
      options.method = options.method || 'PUT'
      return Model.mass_update.call(this, url, options, callback)
    }

  })

  return VenueGameAssignment

}
