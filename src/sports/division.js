"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Division Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Division = SportsModel.extend({

    fetch: function(options, callback) {
      var url = Division.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = Division.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = Division.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    standings: function(options, callback) {
      options = _.extend({division_id: this.id}, options)
      return ngin.Standings.create(options).fetch(callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/divisions')
    },

    list: function(options, callback) {
      var url = Division.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Division

}
