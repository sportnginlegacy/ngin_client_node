"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.Model
  var config = ngin.config

  /**
   * Subvenue Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Subvenue = Model.extend({

    urlRoot: function(options) {
      options = options || {}
      var venueID = options.venue_id || this.venue_id
      this.venue_id = venueID
      delete options.venue_id

      var base = config.urls && config.urls.venues || config.url
      return Url.resolve(base, '/venues/' + this.venue_id + '/subvenues')
    }

  })

  // wrap the inheirited list function with arg checking
  Subvenue.list = _.wrap(Subvenue.list, function(list, options, callback) {
    if (!options.venue_id) return callback(new Error('venue_id is required'))
    list.call(Subvenue, options, callback)
  })

  return Subvenue

}
