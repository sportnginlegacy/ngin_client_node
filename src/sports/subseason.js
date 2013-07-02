"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Subseason Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var Subseason = SportsModel.extend({

    fetch: function(options, callback) {
      var url = Subseason.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = Subseason.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = Subseason.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    addTeam: function(teamId, callback) {
      console.warn('Subseason#addTeam will be depricated')
      var url = Subseason.urlRoot() + '/' + this.id + '/add_team/' + teamId
      return Subseason.sync('update', null, { url:url }, this.callbackWithParse(callback))
    },

    removeTeam: function(teamId, callback) {
      console.warn('Subseason#removeTeam will be depricated')
      var url = Subseason.urlRoot() + '/' + this.id + '/remove_team/' + teamId
      return Subseason.sync('delete', null, { url:url }, callback)
    },

    addDivision: function(divisionId, callback) {
      var url = Subseason.urlRoot() + '/' + this.id + '/add_division/' + divisionId
      return Subseason.sync('update', null, { url:url }, this.callbackWithParse(callback))
    },

    removeDivision: function(divisionId, callback) {
      var url = Subseason.urlRoot() + '/' + this.id + '/remove_division/' + divisionId
      return Subseason.sync('delete', null, { url:url }, callback)
    },

    standings: function(callback) {
      return ngin.Standings.create({subseason_id: this.id}).fetch(callback)
    },

    standingsPreference: function(callback) {
      return ngin.StandingsPreference.create({subseason_id: this.id}).fetch(callback)
    },

    teams: function(callback) {
      console.warn('Subseason#teams will be depricated')
      return ngin.TeamInstance.list({subseason_id: this.id}, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.sports || config.url
      return Url.resolve(base, '/subseasons')
    },

    list: function(options, callback) {
      if (!options || !options.season_id)
        callback(new Error('season_id is required to list subseasons'))
      options.query || (options.query = {})
      options.query.season_id = options.season_id

      var url = Subseason.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return Subseason

}
