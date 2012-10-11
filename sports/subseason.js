
module.exports = init

var Url = require('url')
var _ = require('underscore')
var Model = require('../modelbase')
var sync = require('../sync')

var config = {}

/**
 * The entry point for the Subseason api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  _.extend(config, conf)
  return Subseason
}

/**
 * Subseason Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Subseason = Model.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/subseasons')
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
  },

  addDivision: function(divisionId, callback) {
    var url = this.urlRoot() + '/' + this.id + '/add_division/' + divisionId
    sync('update', null, { url:url }, callback)
  },

  removeDivision: function(divisionId, callback) {
    var url = this.urlRoot() + '/' + this.id + '/remove_division/' + divisionId
    sync('delete', null, { url:url }, callback)
  }

})
