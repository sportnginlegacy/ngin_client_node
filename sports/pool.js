"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Pool Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Pool = SportsModel.extend({

    fetch: function(options, callback) {
      var url = Pool.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = Pool.urlRoot() + '/' + this.id
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = Pool.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    addTeam: function(teamId, callback) {
      var url = Pool.urlRoot() + '/' + this.id + '/add_team/' + teamId
      return Pool.sync('update', null, { url:url }, callback)
    },

    removeTeam: function(teamId, callback) {
      var url = Pool.urlRoot() + '/' + this.id + '/remove_team/' + teamId
      return Pool.sync('delete', null, { url:url }, callback)
    },

    standings: function(callback) {
      var id = this.pool_id || this.id
      return ngin.Standings.create({pool_id:id}).fetch(callback)
    }

  },{

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/pools')
    },

    list: function(options, callback) {
      var url = Pool.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Pool

}
