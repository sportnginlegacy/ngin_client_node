"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config
  var Super = SportsModel.prototype

  /**
   * Scopes the url to the tournament or flight
   *
   * @param {Object} options
   * @returns {String}
   * @api public
   */

  function scopeUrl(options, inst) {
    options = _.extend(_.clone(options || {}), inst)
    if (!options.subseason_id || !options.id)
      throw new Error('subseason_id and team_id required to make team instance api calls')
    return ngin.Subseason.urlRoot() + '/' + options.subseason_id + '/teams/' + options.id
  }

  /**
   * TeamInstance Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TeamInstance = SportsModel.extend({

    fetch: function(options, callback) {
      var url = scopeUrl(options, this)
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      if (typeof options == 'function') {
        callback = options
        options = {}
      }
      if (options.team_id || this.team_id){
        options.method = 'PUT'
      }
      var url = scopeUrl(options, this)
      return Super.save.call(this, url, options, callback)
    }

  }, {

    urlRoot: function(options) {
      return '/team_instances'
    },

    list: function(options, callback) {
      if (!options.subseason_id && !options.team_id)
        throw new Error('subseason_id or team_id required to list team instances')

      var url
      if (options.subseason_id)
        url = ngin.Subseason.urlRoot() + '/' + options.subseason_id + '/teams'
      if (options.team_id)
        url = ngin.Team.urlRoot() + '/' + options.team_id + '/team_instances'

      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return TeamInstance

}
