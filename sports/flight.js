
module.exports = init

var Url = require('url')
var _ = require('underscore')
var Model = require('../modelbase')
var sync = require('../sync')

var config = {}

/**
 * The entry point for the Flight api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  _.extend(config, conf)
  return Flight
}

/**
 * Flight Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Flight = Model.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/flights')
  },

  initialize: function(attr, options) {

  },

  addTeam: function(teamID, callback) {
    var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamID
    sync('update', null, { url:url }, callback)
  },

  removeTeam: function(teamID, callback) {
    var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamID
    sync('delete', null, { url:url }, callback)
  }

})
