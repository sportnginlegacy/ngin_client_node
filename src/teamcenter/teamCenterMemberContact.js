"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * Scopes the url to the team and member
   *
   * @param {Object} options
   * @returns {String}
   * @api public
   */

  function scopeUrl(options, inst) {
    options = _.extend({}, inst, options)
    if (!options.teamcenter_team_id)
      throw new Error('teamcenter_team_id required to make TeamCenterContact instance api calls')
    if (!options.teamcenter_member_id)
      throw new Error('teamcenter_member_id require to make TeamCenterContact instance api calls')

    return ngin.TeamCenterTeam.urlRoot() + '/' + options.teamcenter_team_id + '/' + ngin.TeamCenterMember.urlroot() + '/' + options.teamcenter_member_id + '/' + TeamCenterContact.urlRoot()
  }

  /**
   * TeamCenterContact Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TeamCenterContact = SportsModel.extend({

    fetch: function(options, callback) {
      var url = scopeUrl(options, this) + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = scopeUrl(options, this) + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = scopeUrl(options, this) + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    }

  }, {

    urlRoot: function() {
      return '/contacts'
    },

    list: function(options, callback) {
      var url = scopeUrl(options, this)
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return TeamCenterContact

}
