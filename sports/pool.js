var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * Pool Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Pool = module.exports = SportsModel.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/pools')
  },

  addTeam: function(teamId, callback) {
    var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamId
    Pool.sync('update', null, { url:url }, callback)
  },

  removeTeam: function(teamId, callback) {
    var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamId
    Pool.sync('delete', null, { url:url }, callback)
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
