var Url = require('url')
var _ = require('underscore')
var SportsModel = require('./sportsModel')

var config = {}

/**
 * Subseason Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Subseason = module.exports = SportsModel.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/subseasons')
  },

  addTeam: function(teamId, callback) {
    var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamId
    Subseason.sync('update', null, { url:url }, callback)
  },

  removeTeam: function(teamId, callback) {
    var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamId
    Subseason.sync('delete', null, { url:url }, callback)
  },

  addDivision: function(divisionId, callback) {
    var url = this.urlRoot() + '/' + this.id + '/add_division/' + divisionId
    Subseason.sync('update', null, { url:url }, callback)
  },

  removeDivision: function(divisionId, callback) {
    var url = this.urlRoot() + '/' + this.id + '/remove_division/' + divisionId
    Subseason.sync('delete', null, { url:url }, callback)
  }

}, {

  init: function(conf) {
    _.extend(config, conf)
  }

})
