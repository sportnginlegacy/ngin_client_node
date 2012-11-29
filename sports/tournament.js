
module.exports = init

var Url = require('url')
var _ = require('underscore')
var Model = require('../modelbase')
var Team = require('./team')

var config = {}

/**
 * The entry point for the Tournament api
 *
 * @param {Object} conf
 * @returns {Object}
 * @api public
 */

function init(conf) {
  _.extend(config, conf)
  return Tournament
}

/**
 * Tournament Class
 *
 * @param {Object} attr
 * @param {Object} options
 * @api public
 */

var Tournament = Model.extend({

  urlRoot: function() {
    return Url.resolve(config.urls.sports, '/tournaments')
  },

  initialize: function(attr, options) {

  },

  teams: function(options, callback) {
    var url = Url.resolve(config.urls.sports, '/tournaments/'+options.id+'/teams')
    return (new Team()).list({url: url}, callback)
  },

  addTeam: function(teamID, callback) {
    var url = this.urlRoot() + '/' + this.id + '/add_team/' + teamID
    Tournament.sync('update', null, { url:url }, callback)
  },

  removeTeam: function(teamID, callback) {
    var url = this.urlRoot() + '/' + this.id + '/remove_team/' + teamID
    Tournament.sync('delete', null, { url:url }, callback)
  }

})
