"use strict"
var Url = require('url')
var request = require('request')
var _ = require('underscore')

module.exports = function(ngin) {
  var Model = ngin.Model
  var config = ngin.config

  /**
   * Group Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Group = Model.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.users || config.url
      return Url.resolve(base, '/groups')
    },

    initialize: function(attr, options) {
      this.isThirdNorth = _.memoize(this.isThirdNorth)
    },

    personas: function(options, callback) {
      if (typeof options === 'function') {
        callback = options
        options = {}
      }
      options || (options = {})
      var url = this.urlRoot() + '/' + this.id + '/personas'
      return ngin.Persona.list(_.extend({}, options, {url:url}), callback)
    }

  })

  // wrap the inheirited list function with arg checking
  Group.list = _.wrap(Group.list, function(list, options, callback) {
    if (!options.owner_type) return callback(new Error('owner_type is required'))
    if (!options.owner_id) return callback(new Error('owner_id is required'))
    list.call(Group, options, callback)
  })

  return Group

}


