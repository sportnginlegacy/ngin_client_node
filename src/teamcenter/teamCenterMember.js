"use strict"
var Url = require('url')
var _ = require('underscore')

module.exports = function(ngin) {
  var SportsModel = ngin.SportsModel
  var Super = SportsModel.prototype
  var config = ngin.config

  /**
   * TeamCenterMember Class
   *
   * @param {Object} attr
   * @param {Object} options
   * @api public
   */

  var TeamCenterMember = SportsModel.extend({

    fetch: function(options, callback) {
      var url = TeamCenterMember.urlRoot() + '/' + this.id
      return Super.fetch.call(this, url, options, callback)
    },

    save: function(options, callback) {
      var url = TeamCenterMember.urlRoot() + (this.id ? '/' + this.id : '')
      return Super.save.call(this, url, options, callback)
    },

    destroy: function(options, callback) {
      var url = TeamCenterMember.urlRoot() + '/' + this.id
      return Super.destroy.call(this, url, options, callback)
    },

    acceptInvite: function(options, callback) {
      if (options && !options.inviteToken)
        throw new Error('Invite token is required for acceptInvite')
      var url = TeamCenterMember.inviteUrlRoot() + '/' + options.inviteToken
      return Super.save.call(this, url, options, callback)
    }

  }, {

    urlRoot: function() {
      var base = config.urls && config.urls.teamCenterTeam || config.url
      return Url.resolve(base, '/members')
    },

    inviteUrlRoot: function() {
      var base = config.urls && config.urls.teamCenterTeam || config.url
      return Url.resolve(base, '/invite')
    },

    list: function(options, callback) {
      var url = TeamCenterMember.urlRoot()
      return SportsModel.list.call(this, url, options, callback)
    }

  })

  return TeamCenterMember

}
