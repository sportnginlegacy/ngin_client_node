
module.exports = init

var Url = require('url')
var request = require('request')
var _ = require('underscore')
var Model = require('../modelbase')
var sync = require('../sync')

var config = {}

/**
 * The entry point for the Pool api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  _.extend(config, conf)
  return Pool
}

/**
 * Pool Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Pool = Model.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/pools')
  },

  initialize: function(attr, options) {

  },

  addTeam: function(teamId, callback) {
    var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamId
    sync('update', null, { url:url }, callback)
  },

  removeTeam: function(teamId, callback) {
    var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamId
    sync('delete', null, { url:url }, callback)
  }

})
