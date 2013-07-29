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
      var url = Division.urlRoot(options) + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = Division.urlRoot(options) + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = Division.urlRoot(options) + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    standings: function(subseason_id, callback) {
      return ngin.Standings.create({subseason_id: subseason_id, division_id: this.id}).fetch(callback)
    }

  }, {

    urlRoot: function(options) {
      options = options || {}
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/seasons/' + options.season_id + '/divisions')
    },

    list: function(options, callback) {
      var url = Division.urlRoot(options)
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Division

}
