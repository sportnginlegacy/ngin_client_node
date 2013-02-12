"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var config = ngin.config

  /**
   * Pool Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Pool = SportsModel.extend({

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/pools')
    },

    addTeam: function(teamId, callback) {
      var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamId
      Pool.sync('update', null, { url:url }, callback)
    },

    removeTeam: function(teamId, callback) {
      var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamId
      Pool.sync('delete', null, { url:url }, callback)
    },

    standings: function(callback) {
      var id = this.pool_id || this.id
      return ngin.Standings.create({pool_id:id}).fetch(callback)
    }

  })

  return Pool

}
